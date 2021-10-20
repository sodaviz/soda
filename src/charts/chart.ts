import * as d3 from "d3";
import { cloneDeep } from "lodash";
import { Annotation } from "../annotations/annotation";
import {
  getHorizontalAxisAnnotation,
  horizontalAxis,
} from "../glyphs/axes/horizontal-axis";
import { intervalGraphLayout } from "../layout/interval-graph-layout";
import { rectangle } from "../glyphs/rectangle";
import { BindTarget } from "../glyphs/bind";
import { GlyphModifier } from "../glyphs/glyph-modifier";
import { generateId } from "../utilities/id-generation";
import { ChartObserver } from "../observers/chart-observer";

/**
 * This returns a "placeholder" xScale, which is initially used on a Chart before one is properly initialized.
 * If the Chart tries to use the placeholder scale, it should always return 0s and print out warnings to the console.
 * @internal
 * @param chart
 */
function buildPlaceholderXScale(
  chart: Chart<any>
): d3.ScaleLinear<number, number> {
  let scale = d3.scaleLinear();
  // @ts-ignore
  let placeholderScale = (() => {
    console.warn(
      "xScale on chart",
      chart,
      "has been used before initialization"
    );
    return 0;
  }) as d3.ScaleLinear<number, number>;
  placeholderScale.invert = scale.invert;
  placeholderScale.domain = scale.domain;
  placeholderScale.range = scale.range;
  placeholderScale.clamp = scale.clamp;
  placeholderScale.ticks = scale.ticks;
  placeholderScale.tickFormat = scale.tickFormat;
  placeholderScale.nice = scale.nice;
  placeholderScale.copy = () => {
    console.warn(
      "xScale.copy() on chart",
      chart,
      "has been used before initialization"
    );
    return placeholderScale;
  };
  return placeholderScale;
}

/**
 * This describes a range in semantic coordinates (e.g. base pairs). This will typically describe the
 * current rendered view in a Chart.
 */
export interface ViewRange {
  /**
   * The semantic start of the view.
   */
  start: number;
  /**
   * The semantic end of the view.
   */
  end: number;
  /**
   * The semantic width of the view.
   */
  width: number;
}

/**
 * A re-export of d3.ZoomTransform, with the x, y, and k properties overwritten as public variables. D3 strongly
 * advises against messing with its transform objects directly, but we actually want to do that in SODA sometimes.
 *
 * Transform objects are used to describe and perform transformations on glyphs.
 */
export interface Transform extends d3.ZoomTransform {
  x: number;
  y: number;
  k: number;
}

/**
 * This describes the parameters for configuring a Chart.
 */
export interface ChartConfig<P extends RenderParams = RenderParams> {
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
   * The height in pixels of the Chart's viewport.
   */
  height?: number;
  /**
   * The height in pixels of the Chart's viewport.
   */
  width?: number;
  /**
   * The number of pixels of padding around each edge of the Chart.
   */
  padSize?: number;
  /**
   * This controls whether or not the rows will be colored in an alternating pattern.
   */
  rowStripes?: boolean;
  /**
   * This controls whether or not the Chart will render a horizontal axis.
   */
  axis?: boolean;
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
   * A range of floats that constrains the zoom level.
   */
  scaleExtent?: [number, number];
  /**
   * A callback function that provides a set of ranges that constrains the horizontal translation of the Chart.
   * @param c
   */
  translateExtent?: (c: Chart<P>) => [[number, number], [number, number]];
  /**
   * The first rendering callback function.
   * @param params
   */
  preRender?: (params: P) => void;
  /**
   * The second rendering callback function.
   * @param params
   */
  inRender?: (params: P) => void;
  /**
   * The final rendering callback function.
   * @param params
   */
  postRender?: (params: P) => void;
}

/**
 * This defines the parameters for rendering glyphs in a Chart.
 */
export interface RenderParams {
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
  /**
   * The Annotation objects to be rendered.
   */
  annotations?: Annotation[];
  /**
   * This determines whether or not the Chart will use an automatic layout function.
   */
  autoLayout?: boolean;
  /**
   * If this is provided, the Chart will use it to define a layout for the provided annotations.
   */
  layoutFn?: (ann: Annotation[]) => number;
}

/**
 * This is used for type-narrowing RenderParams objects that explicitly have start and end properties.
 * @internal
 */
interface RenderParamsWithRange extends RenderParams {
  /**
   * The start coordinate of the region that will be rendered.
   */
  start: number;
  /**
   * The end coordinate of the region that will be rendered.
   */
  end: number;
}

/**
 * This is used for type-narrowing RenderParams objects that have Annotation objects.
 * @internal
 */
interface RenderParamsWithAnn extends RenderParams {
  /**
   * The Annotation objects to be rendered.
   */
  annotations: Annotation[];
}

/**
 * Type guard for RenderParamsWithRange.
 * @internal
 */
function hasRange(params: RenderParams): params is RenderParamsWithRange {
  return params.start !== undefined && params.end !== undefined;
}

/**
 * Type guard for RenderParamsWithAnn.
 * @internal
 */
function hasAnn(params: RenderParams): params is RenderParamsWithAnn {
  return params.annotations !== undefined;
}

/**
 * This is used to render Annotation objects as glyphs in the browser.
 */
export class Chart<P extends RenderParams = RenderParams> {
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
   * The number of pixels of padding around each edge of the Chart.
   */
  padSize: number;
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
   * This indicates whether or not the Chart has a horizontal axis.
   */
  axis: boolean;
  /**
   * The Annotation object that is used to render the horizontal axis (if enabled).
   */
  _axisAnn: Annotation | undefined;
  /**
   * This controls whether or not the Chart has automatic resizing enabled.
   */
  resizable: boolean;
  /**
   * This controls whether or not the Chart has zooming enabled.
   */
  zoomable: boolean;
  /**
   * A d3 selection to the Chart's DOM container. This is usually a div.
   */
  _containerSelection: d3.Selection<any, any, any, any> | undefined;
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
   * The Transform object that describes the current zoom transformation.
   */
  _transform: Transform;
  /**
   * The semantic start coordinate of what is currently rendered.
   */
  _renderStart: number = 0;
  /**
   * The semantic end coordinate of what is currently rendered.
   */
  _renderEnd: number = 0;
  /**
   * A D3 scale that the Chart will use to translate between semantic and viewport coordinates. This scale will be
   * periodically re-scaled after zoom events.
   */
  xScale: d3.ScaleLinear<number, number>;
  /**
   * The base D3 scale that will be used to rescale the Chart's xScale.
   */
  xScaleBase: d3.ScaleLinear<number, number>;
  /**
   * The height in pixels of a horizontal row in the Chart. This defaults to a value of 10.
   */
  rowHeight: number = 10;
  /**
   * The number of rows in the Chart.
   */
  rowCount: number = 0;
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
  /**
   * A list of two numbers that define the extent to which a zoom event is allowed to transform the TrackChart's
   * underlying scale. Simply put, this controls how far in and out a user will be able to zoom. The first number
   * is the maximum zoom-out factor, and the second is the maximum zoom-in factor. For example, setting this to
   * [1, 10] will prevent a user from zooming out past the point at which the chart is initially rendered, and
   * allow them to zoom in by a factor of 10.
   * For more info, see https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleExtent
   */
  scaleExtent: [number, number] = [0, Infinity];
  /**
   * This is a callback function that is used to set the translate extent (left/right panning) allowed when a zoom
   * event is applied to the TrackChart. It needs to be a callback, because it needs the absolute width of the
   * TrackChart's SVG viewport, which is allowed to change throughout the TrackChart's lifetime. For example, setting
   * this to:
   * (chart) => [[0, 0], [chart.width, chart.height]] will restrict the panning in the TrackChart to exactly the range
   * that was initially rendered.
   * For more info, see https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateExtent
   * @param chart This callback will receive a reference to the TrackChart that calls it.
   */
  translateExtent: (chart: Chart<any>) => [[number, number], [number, number]] =
    () => [
      [-Infinity, -Infinity],
      [Infinity, Infinity],
    ];
  /**
   * The first rendering callback function.
   * @param params
   */
  preRender: (params: P) => void = (params: P) => Chart.preRender(params, this);
  /**
   * The second rendering callback function.
   * @param params
   */
  inRender: (params: P) => void = (params: P) => Chart.inRender(params, this);
  /**
   * The final rendering callback function.
   * @param params
   */
  postRender: (params: P) => void = (params: P) =>
    Chart.postRender(params, this);

  constructor(config: ChartConfig<P> = {}) {
    this.id = config.id || generateId("soda-chart");

    if (config.selector !== undefined) {
      this._selector = config.selector;
      this._containerSelection = d3.select(this._selector);
      this.padSelection = this._containerSelection.append("svg");
    } else {
      this.padSelection = d3.create("svg:svg").style("vertical-align", "top");
    }
    this.xScale = buildPlaceholderXScale(this);
    this.xScaleBase = this.xScale;
    this._transform = cloneDeep(d3.zoomIdentity);
    this.padSelection.node().__zoom = this._transform;
    this.viewportSelection = this.padSelection
      .append("svg")
      .style("vertical-align", "top")
      .attr("overflow", "hidden");

    this.overflowViewportSelection = this.padSelection
      .append("svg")
      .style("vertical-align", "top")
      .attr("overflow", "visible");

    this.defSelection = this.viewportSelection.append("defs");

    this.padSize = config.padSize || 25;
    this.rowHeight = config.rowHeight || 10;

    this.padSelection
      .attr("width", "100%")
      .attr("height", 2 * this.padSize + this.rowHeight);

    this.fitViewport();

    this.rowStripes = config.rowStripes || false;

    if (this.rowStripes) {
      this.setRowStripes();
    }

    this.axis = config.axis || false;
    this.resizable = config.resizable || false;
    this.zoomable = config.zoomable || false;

    if (config.scaleExtent !== undefined) {
      this.scaleExtent = config.scaleExtent;
    }

    if (config.translateExtent !== undefined) {
      this.translateExtent = config.translateExtent;
    }

    this.preRender = config.preRender || this.preRender;
    this.inRender = config.inRender || this.inRender;
    this.postRender = config.postRender || this.postRender;

    if (this.zoomable) {
      this.configureZoom();
    }

    if (this.resizable) {
      this.configureResize();
    }
  }

  get rowStripeRectSelection() {
    if (this._rowStripeRectSelection == undefined) {
      console.error("_rowStripeRectSelection is not defined on", this);
      throw `_rowStripeRectSelection undefined`;
    }
    return this._rowStripeRectSelection;
  }

  get rowStripePatternSelection() {
    if (this._rowStripePatternSelection == undefined) {
      console.error("_rowStripePatternSelection is not defined on", this);
      throw `_rowStripePatternSelection undefined`;
    }
    return this._rowStripePatternSelection;
  }

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

  public fitPad(): void {
    this.padHeight = this.rowCount * this.rowHeight + 2 * this.padSize;
  }

  public fitViewport(): void {
    this.viewportWidth = this.calculatePadWidth() - 2 * this.padSize;
    this.viewportHeight = this.calculatePadHeight() - 2 * this.padSize;
    this.viewportSelection.attr("x", this.padSize).attr("y", this.padSize);
    this.overflowViewportSelection
      .attr("x", this.padSize)
      .attr("y", this.padSize);

    this.fitRowStripes();
  }

  /**
   * Get the string selector to the container that the Chart lives in.
   */
  get selector(): string {
    if (this._selector == undefined) {
      console.error(
        "_selector not defined on",
        this,
        "is this Chart detached?"
      );
      throw "_selector undefined";
    }
    return this._selector;
  }

  /**
   * Get the semantic coordinate range of what is currently shown in the Chart's viewport.
   */
  public getSemanticViewRange(): ViewRange {
    const start = this.xScale.invert(0);
    const end = this.xScale.invert(this.viewportWidth);
    const width = end - start;
    return { start: start, end: end, width: width };
  }

  /**
   * Get a D3 selection of the Chart's DOM Container. This throws an exception if the value is undefined, which
   * probably means the entire chart is detached from the DOM.
   */
  get containerSelection(): d3.Selection<any, any, any, any> {
    if (this._containerSelection == undefined) {
      console.error(
        "_containerSelection not defined on",
        this,
        "is this Chart detached?"
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
   * This returns the Chart's DOM container's width in pixels.
   */
  public getContainerWidth(): number {
    return this.calculateContainerDimensions().width;
  }

  /**
   * This returns the Chart's DOM container's height in pixels.
   */
  public getContainerHeight(): number {
    return this.calculateContainerDimensions().height;
  }

  /**
   * This figures out the Chart's DOM container's dimensions and sets the Chart's viewport SVG to fill those
   * dimensions.
   */
  public setToContainerDimensions(): void {
    let dims = this.calculateContainerDimensions();
    this.padWidth = dims.width;
    this.padHeight = dims.height;
  }

  /**
   * This gets the width of the Chart's DOM container and sets the Chart's SVG viewport to a square with that width.
   */
  public squareToContainerWidth(): void {
    let dims = this.calculateContainerDimensions();
    this.padWidth = dims.width;
    this.padHeight = dims.width;
    this.fitViewport();
  }

  /**
   * This gets the height of the Chart's DOM container and sets the Chart's SVG viewport to a square with that height.
   */
  public squareToContainerHeight(): void {
    let dims = this.calculateContainerDimensions();
    this.padWidth = dims.height;
    this.padHeight = dims.height;
    this.fitViewport();
  }

  /**
   * This gets the width of the viewport and sets the viewport height to match it. This will update the internal
   * height and width properties.
   */
  public squareToViewportWidth(): void {
    const width = this.calculateViewportWidth();
    this.padHeight = width + 2 * this.padSize;
    this.padWidth = width + 2 * this.padSize;
    this.fitViewport();
  }

  /**
   * This gets the height of the viewport and sets the viewport width to match it. This will update the internal
   * height and width properties.
   */
  public squareToViewportHeight(): void {
    const height = this.calculateViewportHeight();
    this.padHeight = height + 2 * this.padSize;
    this.padWidth = height + 2 * this.padSize;
    this.fitViewport();
  }

  /**
   * This returns a DOMRect that describes the pad dimensions.
   */
  public calculatePadDimensions(): DOMRect {
    let padNode = this.padSelection.node();
    if (padNode == null) {
      console.warn("padSelection is null on", this);
      throw "SVG undefined";
    }
    return padNode.getBoundingClientRect();
  }

  /**
   * This returns the width of the SVG viewport in pixels.
   */
  public calculatePadWidth(): number {
    return this.calculatePadDimensions().width;
  }

  /**
   * This returns the width of the SVG viewport in pixels.
   */
  public calculatePadHeight(): number {
    return this.calculatePadDimensions().height;
  }

  set padHeight(height: number) {
    this._padHeight = height;
    this.padSelection.attr("height", height);
  }

  get padHeight() {
    return this._padHeight;
  }

  set padWidth(width: number) {
    this._padWidth = width;
    this.padSelection.attr("width", width);
  }

  get padWidth() {
    return this._padWidth;
  }

  get renderStart() {
    this._renderStart = this.xScale.invert(0);
    return this._renderStart;
  }

  get renderEnd() {
    this._renderEnd = this.xScale.invert(this.viewportWidth);
    return this._renderEnd;
  }

  /**
   * This returns a DOMRect that describes the viewport's dimensions.
   */
  public calculateViewportDimensions(): DOMRect {
    let viewportNode = this.viewportSelection.node();
    if (viewportNode == null) {
      throw "SVG undefined";
    }
    return viewportNode.getBoundingClientRect();
  }

  /**
   * This checks the current width of the viewport in the DOM (as opposed to the property set internally in the
   * Chart) and returns it.
   */
  public calculateViewportWidth(): number {
    return this.calculateViewportDimensions().width;
  }

  /**
   * This checks the current height of the viewport in the DOM (as opposed to the property set internally in the
   * Chart) and returns it.
   */
  public calculateViewportHeight(): number {
    return this.calculateViewportDimensions().height;
  }

  set viewportHeight(height: number) {
    this._viewportHeight = height;
    this.viewportSelection.attr("height", height);
  }

  get viewportHeight(): number {
    return this._viewportHeight;
  }

  set viewportWidth(width: number) {
    this._viewportWidth = width;
    this.viewportSelection.attr("width", width);
  }

  get viewportWidth() {
    return this._viewportWidth;
  }

  /**
   * This configures the SVG viewport to appropriately handle browser zoom events. It is called in the
   * constructor, and in the TrackChart's resize() method. Currently, most of what this does is prevent zooming with
   * the scroll wheel unless the ctrl key is pressed, and re-applies the scale and translate extents. Eventually,
   * this should end up being parameterized to be a bit more user-configurable.
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
          // set the scale and translate extents of the chart
          // see: https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleExtent
          .scaleExtent(this.scaleExtent)
          .translateExtent(this.translateExtent(this))
          .on("zoom", () => self.zoom())
      )
      .on("dblclick.zoom", null);
  }

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

  set transform(transform: Transform) {
    this.padSelection.node().__zoom = transform;
    this._transform = transform;
  }

  get transform() {
    this._transform = this.padSelection.node().__zoom;
    return this._transform;
  }

  public resetTransform(): void {
    let transform = this.transform;
    transform.x = 0;
    transform.y = 0;
    transform.k = 1;
  }

  /**
   * This takes the provided query arguments and sets the d3 scale to map between the provided semantic range and
   * the TrackChart's actual SVG viewport coordinate space. If there is a ZoomController assigned to the TrackChart, it
   * will set the ZoomController's scale instead.
   * @param start
   * @param end
   */
  public initializeXScale(start: number, end: number): void {
    this._renderStart = start;
    this._renderEnd = end;

    this.xScaleBase = d3
      .scaleLinear()
      .domain([start, end])
      .range([0, this.viewportWidth]);

    this.xScale = this.xScaleBase;
  }

  public rescaleXScale(transformArg?: Transform): void {
    let transform = transformArg || this.transform;
    this.xScale = transform.rescaleX(this.xScaleBase);
  }

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

  public applyGlyphModifiers(): void {
    for (const modifier of this.glyphModifiers) {
      modifier.zoom();
    }
  }

  /**
   * This is the handler method that will be called when the SVG viewport receives a browser zoom event.
   */
  public zoom(): void {
    let transform;
    if (d3.event != undefined) {
      transform = d3.event.transform;
    } else {
      console.warn("d3.event is undefined in zoom() call on", this);
    }
    this.rescaleXScale(transform);
    this.applyGlyphModifiers();
    this.alertObservers();
  }

  public configureResize(): void {
    if (this._containerSelection == undefined) {
      console.warn(
        "No containerSelection defined on",
        this,
        ", can't run configureResize()"
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
   * This resizes the TrackChart to fit the size of its container. This will be called by a ResizeController if
   * one is assigned to the TrackChart. The default behavior is for the TrackChart to fill its container,
   * reconfigure the zoom settings to match the new size, and then re-render the glyphs to appropriately fit in
   * the new dimensions.
   */
  public resize(): void {
    let view = this.getSemanticViewRange();
    this.fitPad();
    this.fitViewport();
    this.resetTransform();
    this.initializeXScale(view.start, view.end);
    this.applyGlyphModifiers();
  }

  /**
   * This calls each of this Chart's attached observer's alert() method.
   */
  public alertObservers(): void {
    for (const observer of this.observers) {
      observer.alert(this);
    }
  }

  get renderParams() {
    if (this._renderParams == undefined) {
      console.error("_renderParams is not defined on", this);
      throw `_renderParams undefined`;
    }
    return this._renderParams;
  }

  set renderParams(params: P) {
    this._renderParams = params;
  }

  /**
   * This method just stores the render parameters on the Chart and calls preRender(), inRender(), and postRender().
   * This is set up this way since preRender() and postRender() will often have common implementations, but
   * inRender() generally will not.
   * @param params
   */
  public render(params: P): void {
    this.renderParams = params;
    this.preRender(params);
    this.inRender(params);
    this.postRender(params);
  }

  static inferRenderRange<P extends RenderParams>(params: P): [number, number] {
    let start, end;
    if (params.start == undefined || params.end == undefined) {
      if (params.annotations == undefined || params.annotations == []) {
        console.error(
          "annotations undefined, can't infer range on RenderParams",
          params
        );
      } else {
        let min = Infinity;
        let max = 0;
        for (const a of params.annotations) {
          min = Math.min(a.x, min);
          max = Math.max(a.x + a.w, max);
        }
        start = params.start || min;
        end = params.end || max;
      }
    }
    return [params.start || start || 0, params.end || end || 0];
  }

  static preRender<P extends RenderParams = RenderParams>(
    params: P,
    chart: Chart<P>
  ) {
    if (
      params.annotations != undefined &&
      (params.autoLayout || params.layoutFn != undefined)
    ) {
      let layoutFn = params.layoutFn || intervalGraphLayout;
      chart.rowCount = params.rowCount || layoutFn(params.annotations) + 1;
    } else {
      chart.rowCount = params.rowCount || 1;
    }

    if (chart.axis) {
      if (chart._axisAnn == undefined) {
        chart._axisAnn = getHorizontalAxisAnnotation(chart);
      }
      horizontalAxis({
        chart,
        annotations: [chart._axisAnn],
        y: () => -20,
        fixed: true,
        bindTarget: BindTarget.Overflow,
      });
    }
    chart.padHeight = chart.rowCount * chart.rowHeight + 2 * chart.padSize;
    chart.fitViewport();

    if (params.initializeXScale === undefined || params.initializeXScale) {
      if (hasRange(params)) {
        chart.initializeXScale(params.start, params.end);
      } else {
        if (hasAnn(params)) {
          let renderRange = Chart.inferRenderRange(params);
          chart.initializeXScale(renderRange[0], renderRange[1]);
        } else {
          throw "Invalid RenderParams";
        }
      }
    }
  }

  static inRender<P extends RenderParams = RenderParams>(
    params: P,
    chart: Chart<P>
  ) {
    if (params.annotations != undefined) {
      rectangle({
        chart,
        annotations: params.annotations,
        selector: "soda-rect",
      });
    }
  }

  static postRender<P extends RenderParams = RenderParams>(
    params: P,
    chart: Chart<P>
  ) {
    chart.applyGlyphModifiers();
  }
}
