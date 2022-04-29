import * as d3 from "d3";
import { cloneDeep } from "lodash";
import { Annotation } from "../annotations/annotation";
import { horizontalAxis } from "../glyphs/axes/horizontal-axis";
import { rectangle } from "../glyphs/rectangle";
import { BindTarget } from "../glyph-utilities/bind";
import { GlyphModifier } from "../glyph-utilities/glyph-modifier";
import { generateId } from "../utilities/id-generation";
import { ChartObserver } from "../observers/chart-observer";
import { removeGlyphsByQuery } from "../glyph-utilities/glyph-removal";
import { AxisType } from "../glyphs/axes";
import {
  defaultVerticalLayout,
  VerticalLayout,
} from "../layout/vertical-layout";
import { intervalGraphLayout } from "../layout/interval-graph-layout";

/**
 * This describes the parameters for a call to the Chart.highlight() function.
 */
export interface HighlightConfig {
  /**
   * The start of the region to be highlighted in semantic coordinates.
   */
  start: number;
  /**
   * The end of the region to be highlighted in semantic coordinates.
   */
  end: number;
  /**
   * The selector that will be applied to the highlight object in the DOM. This will be auto generated if not supplied.
   */
  selector?: string;
  /**
   * The color of the highlight. This defaults to black.
   */
  color?: string;
  /**
   * The opacity of the highlight. This defaults to 0.1.
   */
  opacity?: number;
}

/**
 * A re-export of d3.ZoomTransform, with the x, y, and k properties overwritten as public variables. D3 strongly
 * advises against messing with its transform objects directly, but we actually want to do that in SODA sometimes.
 *
 * Transform objects are used to describe and perform transformations on glyphs.
 */
export interface Transform extends d3.ZoomTransform {
  /**
   * The x translation described by the Transform.
   */
  x: number;
  /**
   * The y translation described by the Transform.
   */
  y: number;
  /**
   * The scaling factor described by the Transform.
   */
  k: number;
}

/**
 * This describes the parameters for configuring and initializing a Chart.
 */
export interface ChartConfig<P extends RenderParams> {
  /**
   * A unique identifier for the Chart. This will be generated automatically if one isn't provided.
   */
  id?: string;
  /**
   * A string that can be used to uniquely select the target DOM container.
   */
  selector?: string;
  /**
   * The height in pixels of a horizontal row in the Chart. This defaults to a value of 10.
   */
  rowHeight?: number;
  /**
   * The number of rows that will be rendered.
   */
  rowCount?: number;
  /**
   * The number of pixels of padding around each edge of the Chart.
   */
  padSize?: number;
  /**
   * The number of pixels of padding on the left side of the Chart.
   */
  leftPadSize?: number;
  /**
   * The number of pixels of padding on the right side of the Chart.
   */
  rightPadSize?: number;
  /**
   * The number of pixels of padding on the top of the Chart.
   */
  upperPadSize?: number;
  /**
   * The number of pixels of padding on the bottom of the Chart.
   */
  lowerPadSize?: number;
  /**
   * The height in pixels of the Chart's containing div.
   */
  divHeight?: number | string;
  /**
   * The width in pixels of the Chart's containing div.
   */
  divWidth?: number | string;
  /**
   * The CSS overflow-y setting of the Chart's containing div.
   */
  divOverflowY?: string;
  /**
   * The CSS overflow-x setting of the Chart's containing div.
   */
  divOverflowX?: string;
  /**
   * The CSS outline property for the Chart's div.
   */
  divOutline?: string;
  /**
   * The CSS margin property for the Chart's div.
   */
  divMargin?: number;
  /**
   * This controls whether or not the rows will be colored in an alternating pattern.
   */
  rowStripes?: boolean;
  /**
   * This controls whether or not the Chart will render a horizontal axis.
   */
  axisType?: AxisType.Top | AxisType.Bottom;
  /**
   * This controls whether or not the Chart will automatically resize itself as it's container changes size. This
   * will cause the Chart to ignore explicit height/width arguments in the config.
   */
  resizable?: boolean;
  /**
   * This controls whether or not the Chart will be configured to allow zooming and panning.
   */
  zoomable?: boolean;
  /**
   * A Chart's contents are scaled by a scaling factor k. If a zoomConstraint of the form [min_k, max_k] is
   * provided, the scaling factor will be constrained to that interval. This will not constrain panning.
   */
  zoomConstraint?: [number, number];
  /**
   * This constrains the Chart's domain, which in turn constrains both zoom level and panning.
   * The parameter is a callback function that is evaluated after each zoom event to produce an interval that
   * constrains the domain.
   */
  domainConstraint?: (chart: Chart<P>) => [number, number];

  updateLayout?: (this: Chart<P>, params: P) => void;
  updateRowCount?: (this: Chart<P>, params: P) => void;
  updateDimensions?: (this: Chart<P>, params: P) => void;
  updateDomain?: (this: Chart<P>, params: P) => void;
  /**
   * The rendering callback that should be responsible for drawing glyphs with the rendering API.
   * @param params
   */
  draw?: (this: Chart<P>, params: P) => void;
  /**
   * The callback function that the Chart executes after render() is called.
   * @param params
   */
  postRender?: (this: Chart<P>, params: P) => void;
  /**
   * The callback function that the Chart executes after zoom() is called.
   * @param params
   */
  postZoom?: (this: Chart<P>) => void;
  /**
   * The callback function that the Chart executes after resize() is called.
   * @param params
   */
  postResize?: (this: Chart<P>) => void;
  /**
   * If this is set to true, the pad and viewport will be shaded so that they are visible in the browser.
   */
  debugShading?: boolean;
}

/**
 * This defines the parameters for a call to a Chart's rendering method.
 */
export interface RenderParams {
  /**
   * The Annotation objects to be rendered.
   */
  annotations?: Annotation[];
  /**
   * The start coordinate of the region that will be rendered.
   */
  start?: number;
  /**
   * The end coordinate of the region that will be rendered.
   */
  end?: number;
  /**
   * Whether or not to initialize the Chart's xScale with the range of the query.
   */
  initializeXScale?: boolean;
  /**
   * The number of rows that will be rendered.
   */
  rowCount?: number;
}

/**
 * This is used to render Annotation objects as glyphs in the browser.
 */
export class Chart<P extends RenderParams> {
  /**
   * A unique identifier for the Chart.
   */
  id: string;
  /**
   * A string that can be used to uniquely select the target DOM container.
   */
  _selector: string | undefined;
  /**
   * The last used render parameters.
   */
  _renderParams: P | undefined;
  /**
   * The CSS height property of the Chart's div.
   */
  divHeight: number | string | undefined;
  /**
   * The CSS width property of the Chart's div.
   */
  divWidth: number | string | undefined;
  /**
   * The CSS overflow-x property of the Chart's div.
   */
  divOverflowX: string | undefined;
  /**
   * The CSS overflow-y property of the Chart's div.
   */
  divOverflowY: string | undefined;
  /**
   * The CSS outline property of the Chart's div.
   */
  divOutline: string | undefined;
  /**
   * The CSS margin property of the Chart's div.
   */
  divMargin: number | undefined;
  /**
   * The number of pixels of padding around each edge of the Chart.
   */
  padSize: number;
  /**
   * The number of pixels of padding on the left side of the Chart.
   */
  leftPadSize: number;
  /**
   * The number of pixels of padding on the right side of the Chart.
   */
  rightPadSize: number;
  /**
   * The number of pixels of padding on the top of the Chart.
   */
  upperPadSize: number;
  /**
   * The number of pixels of padding on the bottom of the Chart.
   */
  lowerPadSize: number;
  /**
   * The width in pixels of the Chart's SVG pad.
   */
  _padWidth: number = 0;
  /**
   * The height in pixels of the Chart's SVG pad.
   */
  _padHeight: number = 0;
  /**
   * The width in pixels of the Chart's SVG viewport.
   */
  _viewportWidth: number = 0;
  /**
   * The height in pixels of the Chart's SVG viewport.
   */
  _viewportHeight: number = 0;
  /**
   * This controls whether or not the Chart has automatic resizing enabled.
   */
  resizable: boolean;
  /**
   * This controls whether or not the Chart has zooming enabled.
   */
  zoomable: boolean;
  /**
   * A d3 selection of the Chart's DOM container. This is a pre-existing DOM element (probably a div).
   */
  _containerSelection: d3.Selection<any, any, any, any> | undefined;
  /**
   * A d3 selection of the Chart's inner div. This is created when the Chart is instantiated and placed inside of the
   * selected container in the DOM.
   */
  divSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the Chart's viewport.
   */
  viewportSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the Chart's viewport that allows rendering overflow.
   */
  overflowViewportSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the viewport's padding container.
   */
  padSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the Chart's defs element. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
   */
  defSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the Chart's highlight.
   */
  highlightSelection: d3.Selection<any, any, any, any>;
  /**
   * A D3 selection of the SVG pattern that is used for row striping.
   */
  _rowStripePatternSelection:
    | d3.Selection<SVGPatternElement, any, any, any>
    | undefined;
  /**
   * A D3 Selection of the SVG rectangle that is used for row striping.
   */
  _rowStripeRectSelection:
    | d3.Selection<SVGRectElement, any, any, any>
    | undefined;
  /**
   * A Chart's contents are scaled by a scaling factor k. If a zoomConstraint of the form [min_k, max_k] is
   * provided, the scaling factor will be constrained to that range. This will not constrain panning.
   */
  zoomConstraint: [number, number];
  /**
   * This constrains the Chart's domain, which in turn constrains both zoom level and panning.
   * The parameter is a callback function that is evaluated after each zoom event to produce an interval that
   * constrains the domain.
   */
  domainConstraint: (chart: Chart<P>) => [number, number];
  /**
   * The initialized domain of the Chart when render() is called with the initializeXScale flag.
   */
  initialDomain: [number, number] = [0, 0];
  /**
   * The Transform object that describes the current zoom transformation.
   */
  _transform: Transform;
  /**
   * A D3 scale that the Chart will use to translate between semantic and viewport coordinates. This scale will be
   * periodically re-scaled after zoom events.
   */
  xScale: d3.ScaleLinear<number, number>;
  /**
   * A simple function that maps from row numbers to the pixel y value of the corresponding row.
   * @param row
   */
  yScale: (this: any, row: number) => number = function (
    this: Chart<P>,
    row: number
  ): number {
    return row * this.rowHeight;
  };
  layout: VerticalLayout = defaultVerticalLayout;
  /**
   * The height in pixels of a horizontal row in the Chart. This defaults to a value of 10.
   */
  rowHeight: number = 10;
  /**
   * The number of rows in the Chart.
   */
  rowCount: number = 1;
  /**
   * This controls whether or not the rows will be colored in an alternating pattern.
   */
  rowStripes: boolean;
  /**
   * A list of observers attached to the Chart.
   */
  observers: ChartObserver[] = [];
  /**
   * A list of GlyphModifiers that control the glyphs rendered in the Chart.
   */
  glyphModifiers: GlyphModifier<any, any>[] = [];

  updateLayout: (this: any, params: P) => void;
  updateRowCount: (this: any, params: P) => void;
  updateDimensions: (this: any, params: P) => void;
  updateDomain: (this: any, params: P) => void;
  draw: (this: any, params: P) => void;

  /**
   * The final rendering callback function.
   * @param params
   */
  postRender: (this: any, params: P) => void = this.defaultPostRender;
  /**
   * The callback function that the Chart executes after zoom() is called.
   */
  postZoom: (this: any) => void = () => {};
  /**
   * The callback function that the Chart executes after resize() is called.
   */
  postResize: (this: any) => void = () => {};

  constructor(config: ChartConfig<P> = {}) {
    this.id = config.id || generateId("soda-chart");

    if (config.selector !== undefined) {
      this._selector = config.selector;
      this._containerSelection = d3.select(this._selector);
      this.divSelection = this._containerSelection.append("div");
    } else {
      this.divSelection = d3.create("div");
    }
    this.padSelection = this.divSelection.append("svg");
    this.padSelection.attr("xmlns", "http://www.w3.org/2000/svg");

    this._transform = cloneDeep(d3.zoomIdentity);
    this.padSelection.node().__zoom = this._transform;

    this.highlightSelection = this.padSelection
      .append("g")
      .attr("class", "highlight");

    this.viewportSelection = this.padSelection
      .append("svg")
      .attr("overflow", "hidden");

    this.overflowViewportSelection = this.padSelection
      .append("svg")
      .attr("overflow", "visible");

    this.defSelection = this.viewportSelection.append("defs");
    this.rowHeight = config.rowHeight || 10;

    this.padSize = config.padSize != undefined ? config.padSize : 25;
    this.leftPadSize =
      config.leftPadSize != undefined ? config.leftPadSize : this.padSize;
    this.rightPadSize =
      config.rightPadSize != undefined ? config.rightPadSize : this.padSize;
    this.upperPadSize =
      config.upperPadSize != undefined ? config.upperPadSize : this.padSize;
    this.lowerPadSize =
      config.lowerPadSize != undefined ? config.lowerPadSize : this.padSize;

    this.divHeight = config.divHeight;
    this.divWidth = config.divWidth;
    this.divOverflowX = config.divOverflowX || "hidden";
    this.divOverflowY = config.divOverflowY || "hidden";
    this.divOutline = config.divOutline;
    this.divMargin = config.divMargin;

    this.updateDivProperties();

    this.padSelection
      .attr("width", "100%")
      .attr("height", this.upperPadSize + this.lowerPadSize + this.rowHeight);

    this.updateViewportProperties();

    this.rowStripes = config.rowStripes || false;

    if (this.rowStripes) {
      this.setRowStripes();
    }

    this.xScale = d3.scaleLinear();
    this.initializeXScale(0, 1);

    this.resizable = config.resizable || false;
    this.zoomable = config.zoomable || false;

    this.updateLayout = config.updateLayout || this.defaultUpdateLayout;
    this.updateRowCount = config.updateRowCount || this.defaultUpdateRowCount;
    this.updateDimensions =
      config.updateDimensions || this.defaultUpdateDimensions;
    this.updateDomain = config.updateDomain || this.defaultUpdateDomain;
    this.draw = config.draw || this.defaultDraw;

    this.postRender = config.postRender || this.postRender;
    this.postZoom = config.postZoom || this.postZoom;
    this.postResize = config.postResize || this.postResize;

    this.zoomConstraint = config.zoomConstraint || [1, Infinity];
    this.domainConstraint =
      config.domainConstraint || ((chart: Chart<P>) => chart.initialDomain);

    if (this.zoomable) {
      this.configureZoom();
    }

    if (this.resizable) {
      this.configureResize();
    }

    if (config.debugShading) {
      this.padSelection
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "blue")
        .attr("fill-opacity", 0.03);

      this.viewportSelection
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "red")
        .attr("fill-opacity", 0.03);
    }
  }

  /**
   * @param params
   */
  public render(params: P): void {
    this.renderParams = params;
    this.updateLayout(params);
    this.updateRowCount(params);
    this.updateDimensions(params);
    this.updateDomain(params);
    this.draw(params);
    this.postRender(params);
  }

  public defaultUpdateLayout<P extends RenderParams>(params: P): void {
    if (params.annotations != undefined) {
      this.layout = intervalGraphLayout(params.annotations);
    }
  }

  public defaultUpdateRowCount<P extends RenderParams>(params: P): void {
    this.rowCount =
      params.rowCount != undefined ? params.rowCount : this.layout.rowCount;
  }

  public defaultUpdateDimensions<P extends RenderParams>(params: P): void {
    this.updateDivHeight();
    this.updatePadHeight();
    this.updateViewportHeight();
  }

  public defaultUpdateDomain<P extends RenderParams>(params: P): void {
    if (params.start != undefined && params.end != undefined) {
      this.initialDomain = [params.start, params.end];
    } else if (params.annotations != undefined) {
      this.initialDomain = Chart.getDomainFromAnnotations(params.annotations);
    }
    this.domain = this.initialDomain;
  }

  public defaultDraw<P extends RenderParams>(params: P): void {
    this.addAxis();
    rectangle({
      chart: this,
      annotations: params.annotations || [],
      selector: "soda-rect",
    });
  }

  public defaultPostRender<P extends RenderParams>(): void {
    this.applyGlyphModifiers();
  }

  /**
   * A getter for the rowStripeSelection property. This serves as a null guard.
   */
  get rowStripeRectSelection() {
    if (this._rowStripeRectSelection == undefined) {
      console.error(
        `_rowStripeRectSelection is not defined on chart: ${this.id}`
      );
      throw `_rowStripeRectSelection undefined`;
    }
    return this._rowStripeRectSelection;
  }

  /**
   * A getter for the rowStripePatternSelection property. This serves as a null guard.
   */
  get rowStripePatternSelection() {
    if (this._rowStripePatternSelection == undefined) {
      console.error(
        `_rowStripePatternSelection is not defined on chart: ${this.id}`
      );
      throw `_rowStripePatternSelection undefined`;
    }
    return this._rowStripePatternSelection;
  }

  /**
   * This initializes the DOM elements that form the row stripes in the Chart, if enabled.
   */
  public setRowStripes() {
    this._rowStripePatternSelection = this.defSelection
      .append("pattern")
      .attr("id", "row-stripes")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("preserveAspectRatio", "xMinYMid meet");

    this._rowStripePatternSelection.append("rect").style("fill", "#E5E4E2");

    this._rowStripePatternSelection
      .append("rect")
      .style("y", this.rowHeight)
      .style("fill", "#B2BEB5");

    this._rowStripeRectSelection = this.viewportSelection
      .append("rect")
      .attr("id", "row-stripes-rect")
      .style("fill", `url(#row-stripes)`)
      .style("fill-opacity", 0.5);

    this.fitRowStripes();
  }

  /**
   * This automatically sets the dimensions of the row stripe DOM elements.
   */
  public fitRowStripes() {
    if (!this.rowStripes) {
      return;
    }
    this.rowStripePatternSelection
      .attr("width", this.viewportWidth)
      .attr("height", this.rowHeight * 2);

    this.rowStripePatternSelection
      .selectAll("rect")
      .attr("height", this.rowHeight)
      .attr("width", this.viewportWidth);

    this.rowStripeRectSelection
      .attr("height", this.viewportHeight)
      .attr("width", this.viewportWidth);
  }

  public updateDivProperties(): void {
    this.updateDivWidth();
    this.updateDivHeight();

    if (this.divOverflowY != undefined) {
      this.divSelection.style("overflow-y", this.divOverflowY);
    } else {
      this.divSelection.style("overflow-y", null);
    }

    if (this.divOverflowX != undefined) {
      this.divSelection.style("overflow-x", this.divOverflowX);
    } else {
      this.divSelection.style("overflow-x", null);
    }

    if (this.divOutline != undefined) {
      this.divSelection.style("outline", this.divOutline);
    } else {
      this.divSelection.style("outline", null);
    }

    if (this.divMargin != undefined) {
      this.divSelection.style("margin", this.divMargin);
    } else {
      this.divSelection.style("margin", null);
    }
  }

  public updateDivHeight(): void {
    if (this.divHeight != undefined) {
      if (typeof this.divHeight == "number") {
        this.divSelection.style("height", `${this.divHeight}px`);
      } else {
        this.divSelection.style("height", this.divHeight);
      }
    } else {
      let height =
        this.rowHeight * this.rowCount + this.upperPadSize + this.lowerPadSize;
      this.divSelection.style("height", `${height}px`);
    }
  }

  public updateDivWidth(): void {
    if (this.divWidth != undefined) {
      if (typeof this.divWidth == "number") {
        this.divSelection.style("width", `${this.divWidth}px`);
      } else {
        this.divSelection.style("width", this.divWidth);
      }
    } else {
      this.divSelection.style("width", "100%");
    }
  }

  public updatePadHeight(): void {
    let height =
      this.rowCount * this.rowHeight + this.upperPadSize + this.lowerPadSize;
    this.padSelection.attr("height", height);
  }

  public updateViewportHeight(): void {
    this.viewportHeight = this.rowCount * this.rowHeight;
  }

  public updateViewportWidth(): void {
    this.viewportWidth =
      this.calculatePadWidth() - (this.leftPadSize + this.rightPadSize);
  }

  public updateViewportPosition(): void {
    this.viewportSelection
      .attr("x", this.leftPadSize)
      .attr("y", this.upperPadSize);
    this.overflowViewportSelection
      .attr("x", this.leftPadSize)
      .attr("y", this.upperPadSize);
  }

  public updateViewportProperties(): void {
    this.updateViewportHeight();
    this.updateViewportWidth();
    this.updateViewportPosition();
  }

  /**
   * Get a D3 selection of the Chart's DOM Container. This throws an exception if the value is undefined, which
   * probably means the entire chart is detached from the DOM.
   */
  get containerSelection(): d3.Selection<any, any, any, any> {
    if (this._containerSelection == undefined) {
      console.error(
        `_containerSelection not defined on chart: ${this.id}, is this chart detached?`
      );
      throw "_containerSelection undefined";
    }
    return this._containerSelection;
  }

  /**
   * This uses d3 to select the Chart's DOM container and returns a DOMRect that describes that containers dimensions.
   */
  public calculateContainerDimensions(): DOMRect {
    let containerDimensions: DOMRect;
    if (this._selector !== undefined) {
      const containerSelection = d3
        .select<HTMLElement, any>(this._selector)
        .node();
      if (containerSelection == null) {
        throw `Selector: ${this._selector} returned null selection`;
      } else {
        containerDimensions = containerSelection.getBoundingClientRect();
      }
    } else {
      containerDimensions = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON(): any {},
      };
    }
    return containerDimensions;
  }

  /**
   * This calculates and returns the Chart's DOM container's width in pixels.
   */
  public getContainerWidth(): number {
    return this.calculateContainerDimensions().width;
  }

  /**
   * This calculates and returns the Chart's DOM container's height in pixels.
   */
  public getContainerHeight(): number {
    return this.calculateContainerDimensions().height;
  }

  public calculateDivDimensions(): DOMRect {
    return this.divSelection.node().getBoundingClientRect();
  }

  /**
   * This returns a DOMRect that describes the pad dimensions.
   */
  public calculatePadDimensions(): DOMRect {
    let padNode = this.padSelection.node();
    if (padNode == null) {
      console.warn(`padSelection is null on chart: ${this.id}`);
      throw "SVG undefined";
    }
    return padNode.getBoundingClientRect();
  }

  /**
   * This calculates and returns the width of the SVG viewport in pixels.
   */
  public calculatePadWidth(): number {
    return this.calculatePadDimensions().width;
  }

  /**
   * This calculates and returns the width of the SVG viewport in pixels.
   */
  public calculatePadHeight(): number {
    return this.calculatePadDimensions().height;
  }

  /**
   * Setter for the viewportHeight property. This actually adjusts the height property on the viewport DOM element.
   * @param height
   */
  set viewportHeight(height: number) {
    this._viewportHeight = height;
    this.viewportSelection.attr("height", height);
    this.overflowViewportSelection.attr("height", height);
  }

  /**
   * Getter for the viewportHeight property.
   */
  get viewportHeight(): number {
    return this._viewportHeight;
  }

  /**
   * Setter for the viewportWidth property. This actually adjusts the width property on the viewport DOM element.
   * @param width
   */
  set viewportWidth(width: number) {
    this._viewportWidth = width;
    this.viewportSelection.attr("width", width);
    this.overflowViewportSelection.attr("width", width);
  }

  /**
   * Getter for the viewportWidth property.
   */
  get viewportWidth() {
    return this._viewportWidth;
  }

  /**
   * This configures the chart's viewport to appropriately handle browser zoom events.
   */
  public configureZoom(): void {
    const self = this;
    this.padSelection
      .call(
        d3
          .zoom()
          .filter(() => {
            if (d3.event.type === "wheel") {
              // don't allow zooming without pressing ctrl
              return d3.event.ctrlKey;
            }
            return true;
          })
          .on("zoom", () => self.zoom())
      )
      .on("dblclick.zoom", null);
  }

  /**
   * This disables zooming on the Chart.
   */
  public disableZoom(): void {
    this.viewportSelection
      .call(
        d3
          .zoom()
          .filter(() => false)
          .on("zoom", () => {
            console.log("this should not happen");
          })
      )
      .on("dblclick.zoom", null);
  }

  /**
   * Setter for the transform property.
   * @param transform
   */
  set transform(transform: Transform) {
    this.padSelection.node().__zoom = transform;
    this._transform = transform;
  }

  /**
   * Getter for the transform property. This also updates the internal transform on the Chart's pad DOM element.
   */
  get transform() {
    this._transform = this.padSelection.node().__zoom;
    return this._transform;
  }

  /**
   * Reset the Chart's transform to the zoom identity (no translation, no zoom).
   */
  public resetTransform(): void {
    let transform = this.transform;
    transform.x = 0;
    transform.y = 0;
    transform.k = 1;
  }

  /**
   * This adds a GlyphModifier to the Chart.
   * @param modifier
   * @param initialize
   */
  public addGlyphModifier<A extends Annotation, C extends Chart<any>>(
    modifier: GlyphModifier<A, C>,
    initialize = true
  ): void {
    if (initialize) {
      modifier.initialize();
    }
    for (const [i, existingModifier] of this.glyphModifiers.entries()) {
      if (existingModifier.selector == modifier.selector) {
        this.glyphModifiers[i] = modifier;
        return;
      }
    }
    this.glyphModifiers.push(modifier);
  }

  /**
   * This applies each of the Chart's GlyphModifier.zoom() methods, resulting in each of the glyphs in the Chart
   * being appropriately redrawn for the current zoom level.
   */
  public applyGlyphModifiers(): void {
    for (const modifier of this.glyphModifiers) {
      modifier.zoom();
    }
    this.zoomHighlight();
  }

  /**
   * This is the handler method that will be called when the Chart's viewport receives a browser zoom event.
   */
  public zoom(): void {
    let transform;
    let source: any;
    if (d3.event != undefined) {
      transform = d3.event.transform;
      source = d3.event.sourceEvent;
    } else {
      console.warn(`d3.event is undefined in zoom() call on chart: ${this.id}`);
    }

    let domainConstraint = this.domainConstraint(this);
    let constrainedWidth = domainConstraint[1] - domainConstraint[0];
    let originalWidth = this.initialDomain[1] - this.initialDomain[0];
    let domainConstraintMinK = originalWidth / constrainedWidth;

    let minK = Math.max(this.zoomConstraint[0], domainConstraintMinK);

    if (transform.k < minK) {
      transform.k = minK;
    } else if (transform.k > this.zoomConstraint[1]) {
      transform.k = this.zoomConstraint[1];
    }

    let newDomain: [number, number] | undefined;

    if (source.type == "wheel") {
      newDomain = this.domainFromWheelEvent(
        transform,
        source,
        domainConstraint
      );
    } else if (source.type == "mousemove") {
      newDomain = this.domainFromMousemoveEvent(
        transform,
        source,
        domainConstraint
      );
    } else {
      console.error(
        `Unhandled event type: ${source.type} in zoom() call on chart: ${this.id}`
      );
    }

    if (newDomain != undefined) {
      this.domain = newDomain;
    }
    this.applyGlyphModifiers();
    this.alertObservers();
    this.postZoom();
  }

  /**
   * This method produces a new domain from a browser wheel event.
   * @param transform
   * @param sourceEvent
   * @param domainConstraint
   */
  public domainFromWheelEvent(
    transform: Transform,
    sourceEvent: WheelEvent,
    domainConstraint: [number, number]
  ): [number, number] {
    let currentDomain = this.xScale.domain();
    let currentDomainWidth = currentDomain[1] - currentDomain[0];
    let originalDomainWidth = this.initialDomain[1] - this.initialDomain[0];

    let mouseX = sourceEvent.offsetX - this.leftPadSize;
    let semanticMouseX = this.xScale.invert(mouseX);

    let leftDomainRatio =
      (semanticMouseX - currentDomain[0]) / currentDomainWidth;

    let rightDomainRatio =
      (currentDomain[1] - semanticMouseX) / currentDomainWidth;

    let newDomainWidth = originalDomainWidth / transform.k;

    let leftDelta = newDomainWidth * leftDomainRatio;
    let rightDelta = newDomainWidth * rightDomainRatio;

    let newDomain: [number, number] = [
      semanticMouseX - leftDelta,
      semanticMouseX + rightDelta,
    ];

    newDomain[0] = Math.max(newDomain[0], domainConstraint[0]);
    newDomain[1] = Math.min(newDomain[1], domainConstraint[1]);

    return newDomain;
  }

  /**
   * This method produces a new domain from a browser mousemove event.
   * @param transform
   * @param sourceEvent
   * @param domainConstraint
   */
  public domainFromMousemoveEvent(
    transform: Transform,
    sourceEvent: WheelEvent,
    domainConstraint: [number, number]
  ): [number, number] {
    let currentDomain = this.xScale.domain();
    let newDomain: [number, number] = [currentDomain[0], currentDomain[1]];

    let deltaX = -(
      this.xScale.invert(sourceEvent.movementX) - currentDomain[0]
    );

    if (newDomain[0] + deltaX <= domainConstraint[0]) {
      deltaX = domainConstraint[0] - newDomain[0];
    } else if (newDomain[1] + deltaX >= domainConstraint[1]) {
      deltaX = domainConstraint[1] - newDomain[1];
    }

    newDomain[0] += deltaX;
    newDomain[1] += deltaX;

    return newDomain;
  }

  /**
   * This initializes an x translation scale with the provided coordinates and the dimensions of the Chart.
   * @param start The start coordinate.
   * @param end The end coordinate.
   */
  public initializeXScale(start: number, end: number): void {
    this.initialDomain[0] = start;
    this.initialDomain[1] = end;
    this.xScale = d3.scaleLinear();
    this.domain = [start, end];
    this.updateRange();
  }

  /**
   * Set the domain of the Chart's x scale.
   * @param domain
   */
  public set domain(domain: [number, number]) {
    this.xScale.domain(domain);
  }

  public get domain() {
    let domain = this.xScale.domain();
    return [domain[0], domain[1]];
  }

  /**
   * Set the range of the Chart's x scale.
   * @param range
   */
  public set range(range: [number, number]) {
    this.xScale.range(range);
  }

  public get range() {
    let range = this.xScale.range();
    return [range[0], range[1]];
  }

  /**
   * Set the range of the Chart's x scale to the viewport dimensions.
   */
  public updateRange(): void {
    this.range = [0, this.viewportWidth];
  }

  /**
   * This configures the Chart to respond to browser resize events. The default resize behavior is for the Chart to
   * maintain the current semantic view range, either stretching or shrinking the current view.
   */
  public configureResize(): void {
    if (this._containerSelection == undefined) {
      console.warn(
        `No containerSelection defined on chart: ${this.id}, can't run configureResize()`
      );
      return;
    }
    let resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.target == this.containerSelection.node()) {
            this.resize();
          }
        }
      }
    );
    resizeObserver.observe(this.containerSelection.node());
  }

  /**
   * This resizes the Chart. If the Chart has resizing enabled, this is called automatically when a browser zoom
   * event occurs.
   */
  public resize(): void {
    this.updatePadHeight();
    this.updateViewportProperties();
    this.updateRange();
    this.applyGlyphModifiers();
    this.postResize();
  }

  /**
   * This calls each of this Chart's attached observer's alert() method.
   */
  public alertObservers(): void {
    for (const observer of this.observers) {
      observer.alert(this);
    }
  }

  /**
   * Getter for the Chart's most recently used RenderParams.
   */
  get renderParams() {
    if (this._renderParams == undefined) {
      console.error(`_renderParams is not defined on chart: ${this.id}`);
      throw `_renderParams undefined`;
    }
    return this._renderParams;
  }

  /**
   * Setter for the renderParams property.
   * @param params
   */
  set renderParams(params: P) {
    this._renderParams = params;
  }

  public addAxis() {
    horizontalAxis({
      chart: this,
      selector: "soda-default-axis",
      annotations: [{ id: "axis", start: 0, end: this.xScale.range()[1] }],
      y: -5,
      fixed: true,
      axisType: AxisType.Top,
      target: BindTarget.Overflow,
    });
  }

  /**
   * This method clears all glyphs that have been rendered in the Chart.
   */
  public clear(): void {
    this.glyphModifiers = [];
    removeGlyphsByQuery({ chart: this });
  }

  /**
   * This method highlights a region in the Chart. If no selector is provided, one will be auto generated and
   * returned by the function.
   * @param config
   */
  public highlight(config: HighlightConfig): string {
    let selector = config.selector || generateId("highlight");
    let selection = this.highlightSelection
      .selectAll<SVGRectElement, string>(`rect.${selector}`)
      .data([config]);

    let enter = selection
      .enter()
      .append("rect")
      .attr("class", selector)
      .attr("y", 0)
      .attr("height", "100%");

    enter
      .merge(selection)
      .attr("x", this.xScale(config.start) + this.leftPadSize)
      .attr("width", this.xScale(config.end) - this.xScale(config.start))
      .attr("fill", config.color || "black")
      .attr("fill-opacity", config.opacity || 0.1);
    selection.exit().remove();
    return selector;
  }

  /**
   * Clear highlights from the Chart. If a selector is supplied, only the highlight that matches that selector will
   * be removed. Otherwise, all highlights will be removed.
   */
  public clearHighlight(selector?: string): void {
    if (selector == undefined) {
      this.highlightSelection.selectAll("rect").remove();
    } else {
      this.highlightSelection
        .selectAll<SVGRectElement, string>(`rect.${selector}`)
        .remove();
    }
  }

  public zoomHighlight(): void {
    this.highlightSelection
      .selectAll<any, HighlightConfig>("rect")
      .attr("x", (config) => this.xScale(config.start) + this.leftPadSize)
      .attr(
        "width",
        (config) => this.xScale(config.end) - this.xScale(config.start)
      );
  }

  static getDomainFromAnnotations<P extends RenderParams>(
    annotations: Annotation[]
  ): [number, number] {
    if (annotations == undefined || annotations == []) {
      return [0, 1];
    } else {
      let min = Infinity;
      let max = 0;
      for (const ann of annotations) {
        min = Math.min(ann.start, min);
        max = Math.max(ann.end, max);
      }
      return [min, max];
    }
  }
}
