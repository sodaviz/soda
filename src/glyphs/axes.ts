import * as d3 from "d3";
import {
  applyPropertyPolicy,
  GlyphProperty,
} from "../glyph-utilities/glyph-property";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";

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

export interface AxisConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
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
   * This defines the tick property that will be passed to D3's axis.tickSizeOuter function. For more information, see
   * https://github.com/d3/d3-axis#axis_tickSizeOuter
   */
  tickSizeOuter?: GlyphProperty<A, C, number>;
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

export class AxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  constructor(config: GlyphModifierConfig<A, C> & AxisConfig<A, C>) {
    super(config);

    this.initializePolicy.styleRuleMap.set("axis-line", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.initializePolicy.styleRuleMap.set("ticks", [
      { key: "stroke-width", property: config.tickStrokeWidth },
      { key: "stroke-opacity", property: config.tickStrokeOpacity },
      { key: "stroke", property: config.tickStrokeColor },
      { key: "fill", property: config.tickFillColor },
      { key: "fill-opacity", property: config.tickFillOpacity },
    ]);

    this.initializePolicy.styleRuleMap.set("tick-labels", [
      { key: "stroke-width", property: config.labelStrokeWidth },
      { key: "stroke-opacity", property: config.labelStrokeOpacity },
      { key: "stroke", property: config.labelStrokeColor },
      { key: "fill", property: config.labelFillColor },
      { key: "fill-opacity", property: config.labelFillOpacity },
    ]);
  }

  initialize() {
    this.zoom();
    this.selectionMap.set("axis-line", this.selection.selectAll("path.domain"));
    this.selectionMap.set("ticks", this.selection.selectAll("g.tick line"));
    this.selectionMap.set(
      "tick-labels",
      this.selection.selectAll("g.tick text")
    );

    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.initializePolicy,
      context: "initialize",
    });
  }
}
