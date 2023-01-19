import * as d3 from "d3";
import {
  applyPropertyPolicy,
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
} from "../glyph-utilities/glyph-property";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";
import { TextConfig } from "./text";
import { AnnotationDatum } from "../glyph-utilities/bind";

/**
 * A simple enum to serve as an argument for selecting which D3 Axis function to call.
 */
export enum AxisType {
  Bottom = "bottom",
  Top = "top",
  Left = "left",
  Right = "right",
}

/**
 * A utility function that returns the results of the various d3 axis functions.
 * @param scale
 * @param axisType
 */
export function getAxis(
  scale: d3.ScaleLinear<number, number>,
  axisType: AxisType
): d3.Axis<number | { valueOf(): number }> {
  if (axisType == AxisType.Bottom) {
    return d3.axisBottom(scale);
  } else if (axisType == AxisType.Top) {
    return d3.axisTop(scale);
  } else if (axisType == AxisType.Left) {
    return d3.axisLeft(scale);
  } else if (axisType == AxisType.Right) {
    return d3.axisRight(scale);
  } else {
    throw "Invalid AxisType " + axisType + " on getAxis() call";
  }
}

/**
 * @internal
 */
export interface AxisConfig<A extends Annotation, C extends Chart<any>>
  // extend TextConfig so we can inherit font settings for free
  extends TextConfig<A, C> {
  /**
   * This defines the domain of the D3 scale used to create the axis glyph.
   */
  domain?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the range of the D3 scale used to create the axis glyph.
   */
  range?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the tick property that will be passed to D3's axis.ticks function. For more information, see
   * https://github.com/d3/d3-axis#axis_ticks
   */
  ticks?: GlyphProperty<A, C, number>;
  /**
   * This controls the size of the "outer" axis ticks.
   * For more information, see: https://github.com/d3/d3-axis#axis_tickSizeOuter
   */
  tickSizeOuter?: GlyphProperty<A, C, number>;
  /**
   * This controls the size of the "inner" axis ticks.
   * For more information, see: https://github.com/d3/d3-axis#axis_tickSizeInner
   */
  tickSizeInner?: GlyphProperty<A, C, number>;
  /**
   * This controls the tick count and format of the tick labels.
   * For more information, see: https://github.com/d3/d3-axis#axis_ticks
   */
  tickFormat?: GlyphProperty<A, C, string>;
  /**
   * This controls the distance between the tick marks and tick labels.
   * For more information, see: https://github.com/d3/d3-axis#axis_tickPadding
   */
  tickPadding?: GlyphProperty<A, C, number>;
  /**
   * This defines the stroke width of the tick marks on the axis.
   */
  tickStrokeWidth?: GlyphProperty<A, C, number>;
  /**
   * This defines the stroke color of the tick marks on the axis.
   */
  tickStrokeColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the stroke opacity of the tick marks on the axis.
   */
  tickStrokeOpacity?: GlyphProperty<A, C, number>;
  /**
   * This defines the fill color of the tick marks on the axis
   */
  tickFillColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the fill opacity of the tick marks on the axis.
   */
  tickFillOpacity?: GlyphProperty<A, C, string>;
  /**
   * This defines the stroke width of the tick labels on the axis.
   */
  labelStrokeWidth?: GlyphProperty<A, C, number>;
  /**
   * This defines the stroke color of the tick labels on the axis.
   */
  labelStrokeColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the stroke opacity of the labels on the axis.
   */
  labelStrokeOpacity?: GlyphProperty<A, C, number>;
  /**
   * This defines fill color of the tick labels on the axis.
   */
  labelFillColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the fill opacity of the labels on the axis.
   */
  labelFillOpacity?: GlyphProperty<A, C, number>;
}

/**
 * @internal
 */
export abstract class AxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  domain: GlyphCallback<A, C, [number, number]>;
  range: GlyphCallback<A, C, [number, number]>;
  ticks: GlyphCallback<A, C, number>;
  tickSizeOuter: GlyphCallback<A, C, number>;
  tickSizeInner: GlyphCallback<A, C, number>;
  tickPadding: GlyphCallback<A, C, number>;
  axisType: GlyphCallback<A, C, AxisType>;

  constructor(config: GlyphModifierConfig<A, C> & AxisConfig<A, C>) {
    super(config);

    // these defaults should always be overridden
    this.domain = () => [0, 0];
    this.range = () => [0, 0];
    this.axisType = () => AxisType.Top;

    // these defaults are actually intentional
    this.ticks = callbackifyOrDefault(config.ticks, () => 5);
    this.tickSizeOuter = callbackifyOrDefault(config.tickSizeOuter, () => 6);
    this.tickSizeInner = callbackifyOrDefault(config.tickSizeInner, () => 6);
    this.tickPadding = callbackifyOrDefault(config.tickPadding, () => 3);

    // the axis line styles should be fine if they're just applied at init time
    this.initializePolicy.styleRuleMap.set("axis-line", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    // the ticks and labels, however, are currently removed from the DOM and
    // replaced during zoom events, so we want to make sure their styles are
    // applied on every zoom event
    this.zoomPolicy.styleRuleMap.set("ticks", [
      { key: "stroke-width", property: config.tickStrokeWidth },
      { key: "stroke-opacity", property: config.tickStrokeOpacity },
      { key: "stroke", property: config.tickStrokeColor },
      { key: "fill", property: config.tickFillColor },
      { key: "fill-opacity", property: config.tickFillOpacity },
    ]);

    this.zoomPolicy.styleRuleMap.set("tick-labels", [
      { key: "stroke-width", property: config.labelStrokeWidth },
      { key: "stroke-opacity", property: config.labelStrokeOpacity },
      { key: "stroke", property: config.labelStrokeColor },
      { key: "fill", property: config.labelFillColor },
      { key: "fill-opacity", property: config.labelFillOpacity },
      { key: "font-family", property: config.fontFamily },
      { key: "text-anchor", property: config.textAnchor },
      { key: "font-size", property: config.fontSize },
      { key: "font-weight", property: config.fontWeight },
      { key: "font-style", property: config.fontStyle },
    ]);
  }

  abstract buildScale(d: AnnotationDatum<A, C>): d3.ScaleLinear<number, number>;

  initialize() {
    // we need to build the axis first, or we won't have the axis elements
    // in the DOM when we go to apply the property policies
    this.zoom();
    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.initializePolicy,
      context: "initialize",
    });
  }

  zoom() {
    let axisGroup = this.selectionMap.get("group");
    if (axisGroup == undefined) {
      console.error(
        "group selection undefined in call to zoom(), unable to build axis"
      );
      throw "group selection undefined";
    }

    axisGroup.each((d, i, nodes) => {
      let axis = getAxis(this.buildScale(d), this.axisType(d))
        .ticks(this.ticks(d))
        .tickSizeInner(this.tickSizeInner(d))
        .tickSizeOuter(this.tickSizeOuter(d))
        .tickPadding(this.tickPadding(d));

      d3.select(nodes[i]).call(axis);
    });

    this.selectionMap.set("axis-line", this.selection.selectAll("path.domain"));
    this.selectionMap.set("ticks", this.selection.selectAll("g.tick line"));
    this.selectionMap.set(
      "tick-labels",
      this.selection.selectAll("g.tick text")
    );
    super.zoom();
  }
}
