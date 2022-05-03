import * as d3 from "d3";
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
import { Transform } from "./transform";

/**
 * A utility function for setting DOM element properties. If the value passed in is a number <n>, it is transformed
 * into the string "<n>px"; otherwise it returns the value unaltered.
 * @param value
 * @internal
 */
function pixelizeValue(value: string | number | undefined): string | undefined {
  if (value == undefined) {
    return value;
  } else if (typeof value == "number") {
    return `${value}px`;
  } else {
    return value;
  }
}

/**
 * A utility function that returns a D3 Selection's first node's bounding rectangle. It throws an exception if the
 * call to Selection.node() returns null.
 * @param selection
 * @internal
 */
function getSelectionDomRect(
  selection: d3.Selection<any, any, any, any>
): DOMRect {
  let node = selection.node();
  if (node == null) {
    throw "null selection on call to getSelectionDomRect()";
  }
  return node.getBoundingClientRect();
}

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
  selector: string;
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
  divMargin?: string | number;
  /**
   * A list of colors that will color the Chart's rows in a repeating pattern.
   */
  rowColors?: string[];
  /**
   * The opacity of the colored row stripes.
   */
  rowOpacity?: number;
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
  /**
   * The rendering callback function that should be responsible for updating the Chart.layout property.
   * @param params
   */
  updateLayout?: (this: Chart<P>, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the Chart.rowCount property.
   * @param params
   */
  updateRowCount?: (this: Chart<P>, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the Chart's DOM element dimensions.
   * @param params
   */
  updateDimensions?: (this: Chart<P>, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the domain of the Chart.xScale property.
   * @param params
   */
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
  selector: string;
  /**
   * The last used render parameters.
   */
  _renderParams: P | undefined;
  /**
   * The CSS height property of the Chart's div.
   */
  _divHeight: string | undefined;
  /**
   * The CSS width property of the Chart's div.
   */
  _divWidth: string | undefined;
  /**
   * The CSS overflow-x property of the Chart's div.
   */
  _divOverflowX: string | undefined;
  /**
   * The CSS overflow-y property of the Chart's div.
   */
  _divOverflowY: string | undefined;
  /**
   * The CSS outline property of the Chart's div.
   */
  _divOutline: string | undefined;
  /**
   * The CSS margin property of the Chart's div.
   */
  _divMargin: string | number | undefined;
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
   * The stored value of the pad SVG width property.
   */
  _padWidth: string | undefined;
  /**
   * The stored value of the pad SVG height property.
   */
  _padHeight: string | undefined;
  /**
   * The stored value of the viewport SVG width property.
   */
  _viewportWidth: string | undefined;
  /**
   * The stored width of the viewport SVG in pixels.
   */
  viewportWidthPx: number = 0;
  /**
   * The stored value of the viewport SVG height property.
   */
  _viewportHeight: string | undefined;
  /**
   * The stored height of the viewport SVG in pixels.
   */
  viewportHeightPx: number = 0;
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
  containerSelection: d3.Selection<any, any, any, any>;
  /**
   * A d3 selection of the Chart's div container. This is created when the Chart is instantiated and placed inside
   * of the
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
  initialDomain: [number, number] = [0, 1];
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
  rowHeight: number;
  /**
   * The number of rows in the Chart.
   */
  rowCount: number;
  /**
   * A list of colors that will color the Chart's rows in a repeating pattern.
   */
  rowColors: string[] | undefined;
  /**
   * The opacity of the colored row stripes.
   */
  rowOpacity: number = 1;
  /**
   * A list of observers attached to the Chart.
   */
  observers: ChartObserver[] = [];
  /**
   * A list of GlyphModifiers that control the glyphs rendered in the Chart.
   */
  glyphModifiers: GlyphModifier<any, any>[] = [];
  /**
   * The rendering callback function that should be responsible for updating the Chart.layout property.
   * @param params
   */
  updateLayout: (this: any, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the Chart.rowCount property.
   * @param params
   */
  updateRowCount: (this: any, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the Chart's DOM element dimensions.
   * @param params
   */
  updateDimensions: (this: any, params: P) => void;
  /**
   * The rendering callback function that should be responsible for updating the domain of the Chart.xScale property.
   * @param params
   */
  updateDomain: (this: any, params: P) => void;
  /**
   * The rendering callback that should be responsible for drawing glyphs with the rendering API.
   * @param params
   */
  draw: (this: any, params: P) => void;
  /**
   * The callback function that the Chart executes after render() is called.
   * @param params
   */
  postRender: (this: any, params: P) => void;
  /**
   * The callback function that the Chart executes after zoom() is called.
   */
  postZoom: (this: any) => void;
  /**
   * The callback function that the Chart executes after resize() is called.
   */
  postResize: (this: any) => void;

  constructor(config: ChartConfig<P>) {
    this.id = config.id || generateId("soda-chart");

    this.selector = config.selector;
    this.containerSelection = d3.select(this.selector);
    this.divSelection = this.containerSelection.append("div");

    this.padSelection = this.divSelection.append("svg");
    this.padSelection.attr("xmlns", "http://www.w3.org/2000/svg");

    this._transform = new Transform(1, 0, 0);
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
    this.rowCount = 1;

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

    this.padSelection
      .attr("width", "100%")
      .attr("height", this.upperPadSize + this.lowerPadSize + this.rowHeight);

    this.updateViewportProperties();
    this.xScale = d3.scaleLinear();
    this.initializeXScale(0, 1);

    this.rowColors = config.rowColors;
    this.rowOpacity =
      config.rowOpacity != undefined ? config.rowOpacity : this.rowOpacity;
    this.addRowStripes();

    this.resizable = config.resizable || false;
    this.zoomable = config.zoomable || false;

    this.updateLayout = config.updateLayout || this.defaultUpdateLayout;
    this.updateRowCount = config.updateRowCount || this.defaultUpdateRowCount;
    this.updateDimensions =
      config.updateDimensions || this.defaultUpdateDimensions;
    this.updateDomain = config.updateDomain || this.defaultUpdateDomain;
    this.draw = config.draw || this.defaultDraw;
    this.postRender = config.postRender || this.defaultPostRender;
    this.postZoom = config.postZoom || (() => {});
    this.postResize = config.postResize || (() => {});

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

  //-----------//
  // rendering //
  //-----------//

  /**
   * This method executes the default rendering routine. It executes each rendering callback function in succession.
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

  /**
   * The default updateLayout() callback. It calls intervalGraphLayout() on the annotations property of the provided
   * RenderParams.
   * @param params
   */
  public defaultUpdateLayout<P extends RenderParams>(params: P): void {
    if (params.annotations != undefined) {
      this.layout = intervalGraphLayout(params.annotations);
    }
  }

  /**
   * The default updateRowCount() callback. It sets Chart.rowCount equal to Chart.layout.rowCount.
   * @param params
   */
  public defaultUpdateRowCount<P extends RenderParams>(params: P): void {
    this.rowCount =
      params.rowCount != undefined ? params.rowCount : this.layout.rowCount;
  }

  /**
   * The default updateDimensions() callback. It calls updateDivHeight(), updatePadHeight(), and
   * updateViewportHeight(). The result is that the Chart should be tall enough to render the number of rows
   * specified in the rowCount property.
   * @param params
   */
  public defaultUpdateDimensions<P extends RenderParams>(params: P): void {
    this.updateDivHeight();
    this.updatePadHeight();
    this.updateViewportHeight();
  }

  /**
   * The default updateDomain() callback. If the start and end properties are set on the RenderParams, it uses those
   * to set the domain. If they are not defined, it finds the minimum start and maximum end amongst the annotations
   * property on the RenderParams. If there are no annotations on the RenderParams, it leaves the domain alone.
   * @param params
   */
  public defaultUpdateDomain<P extends RenderParams>(params: P): void {
    let domain = this.domain;
    if (params.start != undefined && params.end != undefined) {
      domain = [params.start, params.end];
    } else if (params.annotations != undefined) {
      domain = Chart.getDomainFromAnnotations(params.annotations);
    }
    this.initialDomain = domain;
    this.domain = domain;
  }

  /**
   * The default draw() callback. It adds a horizontal axis and renders the RenderParams.annotations property as
   * rectangles.
   * @param params
   */
  public defaultDraw<P extends RenderParams>(params: P): void {
    this.addAxis();
    rectangle({
      chart: this,
      annotations: params.annotations || [],
      selector: "soda-rect",
    });
  }

  /**
   * The default postRender() callback. It calls the Chart.applyGlyphModifiers() method.
   */
  public defaultPostRender<P extends RenderParams>(): void {
    this.applyGlyphModifiers();
  }

  /**
   * This adds a horizontal axis glyph to the top of the Chart.
   */
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
   * If they have been added, this method removes row stripes from the Chart.
   */
  public removeRowStripes(): void {
    this.defSelection.selectAll("pattern#row-stripes-pattern").remove();
    this.viewportSelection.selectAll("rect#row-stripes-rect").remove();
  }

  /**
   * If the rowColors property has been defined, this method adds row stripes to the Chart.
   */
  public addRowStripes(): void {
    if (this.rowColors == undefined) {
      console.warn(`rowColors are not defined on chart: ${this.id}`);
      return;
    }

    this.removeRowStripes();

    let patternSelection = this.defSelection
      .append("pattern")
      .attr("id", "row-stripes-pattern")
      .attr("height", this.rowColors.length * this.rowHeight)
      .attr("width", "100%")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("preserveAspectRatio", "xMinYMid meet");

    patternSelection
      .selectAll("rect")
      .data(this.rowColors)
      .enter()
      .append("rect")
      .style("fill", (d) => d)
      .style("fill-opacity", this.rowOpacity)
      .attr("y", (d, i) => i * this.rowHeight)
      .attr("height", this.rowHeight)
      .attr("width", "100%");

    this.viewportSelection
      .insert("rect", ":first-child")
      .attr("id", "row-stripes-rect")
      .style("fill", `url(#row-stripes-pattern)`)
      .style("fill-opacity", 0.5)
      .attr("height", "100%")
      .attr("width", "100%");
  }

  //---------//
  // utility //
  //---------//

  /**
   * Sets a style property on the Chart's div selection.
   * @param property
   * @param value
   */
  public setDivStyle(property: string, value: string | undefined) {
    if (value == undefined) {
      this.divSelection.style(property, null);
    } else {
      this.divSelection.style(property, value);
    }
  }

  /**
   * Sets an attribute on the Chart's SVG pad.
   * @param attribute
   * @param value
   */
  public setPadAttribute(attribute: string, value: string | undefined) {
    if (value == undefined) {
      this.padSelection.attr(attribute, null);
    } else {
      this.padSelection.attr(attribute, value);
    }
  }

  /**
   * Sets an attribute on the Chart's SVG viewports.
   * @param attribute
   * @param value
   */
  public setViewportAttribute(attribute: string, value: string | undefined) {
    if (value == undefined) {
      this.viewportSelection.attr(attribute, null);
      this.overflowViewportSelection.attr(attribute, null);
    } else {
      this.viewportSelection.attr(attribute, value);
      this.overflowViewportSelection.attr(attribute, value);
    }
  }

  //-----------//
  // accessors //
  //-----------//

  /**
   * Sets the divHeight property. This directly adjusts the height CSS style property on the Chart's div element.
   * @param value
   */
  set divHeight(value: string | number | undefined) {
    value = pixelizeValue(value);
    this._divHeight = value;
    this.setDivStyle("height", value);
  }

  /**
   * Gets the divHeight property.
   */
  get divHeight() {
    return this.divSelection.style("height");
  }

  /**
   * Sets the divWidth property. This directly adjusts the width CSS style property on the Chart's div element.
   * @param value
   */
  set divWidth(value: string | number | undefined) {
    value = pixelizeValue(value);
    this._divWidth = value;
    this.setDivStyle("width", value);
  }

  /**
   * Gets the divWidth property.
   */
  get divWidth() {
    return this.divSelection.style("width");
  }

  /**
   * Sets the divOverflowY property. This directly adjusts the overflow-y CSS style property on the Chart's div element.
   * @param value
   */
  set divOverflowY(value: string | undefined) {
    this._divOverflowY = value;
    this.setDivStyle("overflow-y", value);
  }

  /**
   * Gets the divOverflowY property.
   */
  get divOverflowY() {
    return this.divSelection.style("overflow-y");
  }

  /**
   * Sets the divOverflowX property. This directly adjusts the overflow-x CSS style property on the Chart's div element.
   * @param value
   */
  set divOverflowX(value: string | undefined) {
    this._divOverflowX = value;
    this.setDivStyle("overflow-x", value);
  }

  /**
   * Gets the divOverflowX property.
   */
  get divOverflowX() {
    return this.divSelection.style("overflow-x");
  }

  /**
   * Sets the divOutline property. This directly adjusts the outline CSS style property on the Chart's div element.
   * @param value
   */
  set divOutline(value: string | undefined) {
    this._divOutline = value;
    this.setDivStyle("outline", value);
  }

  /**
   * Gets the divOutline property.
   */
  get divOutline() {
    return this.divSelection.style("outline");
  }

  /**
   * Sets the divMargin property. This directly adjusts the margin CSS style property on the Chart's div element.
   * @param value
   */
  set divMargin(value: string | number | undefined) {
    value = pixelizeValue(value);
    this._divMargin = value;
    this.setDivStyle("margin", value);
  }

  /**
   * Gets the divMargin property.
   */
  get divMargin() {
    return this.divSelection.style("margin");
  }

  /**
   * Sets the viewportHeight property. This directly adjusts the height SVG attribute on the Chart's viewport
   * SVG element.
   * @param value
   */
  set viewportHeight(value: string | number | undefined) {
    value = pixelizeValue(value);
    this._viewportHeight = value;
    this.setViewportAttribute("height", value);
  }

  /**
   * Gets the viewportHeight property.
   */
  get viewportHeight() {
    return this.viewportSelection.attr("height");
  }

  /**
   * Sets the viewportWidth property. This directly adjusts the width SVG attribute on the Chart's viewport
   * SVG element.
   * @param value
   */
  set viewportWidth(value: string | number | undefined) {
    value = pixelizeValue(value);
    this._viewportWidth = value;
    this.setViewportAttribute("width", value);
  }

  /**
   * Gets the viewportWidth property.
   */
  get viewportWidth() {
    return this.viewportSelection.attr("width");
  }

  /**
   * Set the domain of the Chart's x scale.
   * @param domain
   */
  public set domain(domain: [number, number]) {
    this.xScale.domain(domain);
  }

  /**
   * Gets the domain of the Chart's x scale.
   */
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

  /**
   * Gets the range of the Chart's x scale.
   */
  public get range() {
    let range = this.xScale.range();
    return [range[0], range[1]];
  }

  //----------//
  // updaters //
  //----------//

  /**
   * This updates the Chart's div height to accommodate the rowHeight, rowCount, and pad sizes. If Chart._divHeight is
   * explicitly defined, this will do nothing.
   */
  public updateDivHeight(): void {
    if (this._divHeight != undefined) {
      return;
    }

    let height =
      this.rowHeight * this.rowCount + this.upperPadSize + this.lowerPadSize;
    this.divSelection.style("height", `${height}px`);
  }

  /**
   * This sets the Chart's div width to 100%. If Chart._divWidth is explicitly defined, this will do nothing.
   */
  public updateDivWidth(): void {
    if (this._divWidth != undefined) {
      return;
    }

    this.divSelection.style("width", "100%");
  }

  /**
   * This updates the Chart's SVG pad height to accommodate the rowHeight, rowCount, and the upper/lower pad sizes. If
   * Chart._padHeight is explicitly defined, this will do nothing.
   */
  public updatePadHeight(): void {
    if (this._padHeight != undefined) {
      return;
    }

    let height =
      this.rowCount * this.rowHeight + this.upperPadSize + this.lowerPadSize;
    this.padSelection.attr("height", height);
  }

  /**
   * This updates the Chart's SVG viewport heights to accommodate the rowHeight and rowCount. If
   * Chart._viewportHeight is explicitly defined, this will do nothing.
   */
  public updateViewportHeight(): void {
    if (this._viewportHeight != undefined) {
      return;
    }

    let height = this.rowCount * this.rowHeight;
    this.viewportHeightPx = height;
    this.setViewportAttribute("height", `${height}`);
  }

  /**
   * This updates the Chart's SVG viewport width to accommodate the left and right pad sizes. If Chart._viewportWidth is
   * explicitly defined, this will do nothing.
   */
  public updateViewportWidth(): void {
    if (this._viewportWidth != undefined) {
      return;
    }

    let width =
      this.calculatePadWidth() - (this.leftPadSize + this.rightPadSize);

    this.viewportWidthPx = width;
    this.setViewportAttribute("width", `${width}`);
  }

  /**
   * This updates the Chart's SVG viewport positions to accommodate the left and upper pad sizes.
   */
  public updateViewportPosition(): void {
    this.viewportSelection
      .attr("x", this.leftPadSize)
      .attr("y", this.upperPadSize);
    this.overflowViewportSelection
      .attr("x", this.leftPadSize)
      .attr("y", this.upperPadSize);
  }

  /**
   * This updates all of the viewport properties by calling updateViewportHeight(), updateViewportWidth(), and
   * updateViewportPosition().
   */
  public updateViewportProperties(): void {
    this.updateViewportHeight();
    this.updateViewportWidth();
    this.updateViewportPosition();
  }

  /**
   * This sets the Chart.xScale range to [0, viewportWidthPx]
   */
  public updateRange(): void {
    this.range = [0, this.viewportWidthPx];
  }

  //-------------//
  // calculators //
  //-------------//

  /**
   * This returns a DOMRect that describes the bounding box of the Chart's container.
   */
  public calculateContainerDimensions(): DOMRect {
    return getSelectionDomRect(this.containerSelection);
  }

  /**
   * This calculates and returns the Chart's DOM container's width in pixels.
   */
  public calculateContainerWidth(): number {
    return this.calculateContainerDimensions().width;
  }

  /**
   * This calculates and returns the Chart's DOM container's height in pixels.
   */
  public calculateContainerHeight(): number {
    return this.calculateContainerDimensions().height;
  }

  /**
   * This returns a DOMRect that describes the bounding box of the Chart's div.
   */
  public calculateDivDimensions(): DOMRect {
    return getSelectionDomRect(this.divSelection);
  }

  /**
   * This returns a DOMRect that describes the SVG pad dimensions.
   */
  public calculatePadDimensions(): DOMRect {
    return getSelectionDomRect(this.padSelection);
  }

  /**
   * This calculates and returns the width of the SVG pad in pixels.
   */
  public calculatePadWidth(): number {
    return this.calculatePadDimensions().width;
  }

  /**
   * This calculates and returns the height of the SVG pad in pixels.
   */
  public calculatePadHeight(): number {
    return this.calculatePadDimensions().height;
  }

  /**
   * This returns a DOMRect that describes the bounding box of the viewport.
   */
  public calculateViewportDimensions(): DOMRect {
    return getSelectionDomRect(this.viewportSelection);
  }

  /**
   * This calculates and returns the width of the SVG viewport in pixels.
   */
  public calculateViewportWidth(): number {
    return this.calculateViewportDimensions().width;
  }

  /**
   * This calculates and returns the height of the SVG viewport in pixels.
   */
  public calculateViewportHeight(): number {
    return this.calculateViewportDimensions().height;
  }

  //------------//

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
          .on("zoom", () => {})
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
   * This configures the Chart to respond to browser resize events. The default resize behavior is for the Chart to
   * maintain the current semantic view range, either stretching or shrinking the current view.
   */
  public configureResize(): void {
    if (this.containerSelection == undefined) {
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

  /**
   * This zooms the Chart highlights.
   */
  public zoomHighlight(): void {
    this.highlightSelection
      .selectAll<any, HighlightConfig>("rect")
      .attr("x", (config) => this.xScale(config.start) + this.leftPadSize)
      .attr(
        "width",
        (config) => this.xScale(config.end) - this.xScale(config.start)
      );
  }

  /**
   * Returns a domain given a list of Annotations.
   * @param annotations
   */
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
