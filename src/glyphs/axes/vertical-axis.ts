import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisConfig, AxisModifier, AxisType, getAxis } from "../axes";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import { GlyphModifierConfig } from "../../glyph-utilities/glyph-modifier";
import {
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the verticalAxis rendering function.
 */
export interface VerticalAxisConfig<A extends Annotation, C extends Chart<any>>
  extends AxisConfig<A, C> {
  /**
   * This determines whether the ticks and labels will be placed on the left or the right of the axis.
   */
  axisType?: GlyphProperty<A, C, AxisType.Left | AxisType.Right>;
  /**
   * The number of bins that the axis will span. This defaults to 1, which forces the axis to fit into one row. If
   * an argument is supplied, it will cause the axis to grow downward. It will have no effect if a custom domain
   * function is supplied.
   */
  rowSpan?: number;
}

/**
 * A class that manages the styling and positioning of a group of vertical axis glyphs.
 * @internal
 */
export class VerticalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends AxisModifier<A, C> {
  rowSpan: number;

  constructor(config: GlyphModifierConfig<A, C> & VerticalAxisConfig<A, C>) {
    super(config);
    this.domain = callbackifyOrDefault(config.domain, () => [0, 1]);
    this.rowSpan = config.rowSpan || 1;
    this.range = callbackifyOrDefault(config.range, (d) => [
      0,
      d.c.rowHeight * this.rowSpan - 4,
    ]);

    this.ticks = callbackifyOrDefault(config.ticks, () => 5);
    this.tickSizeOuter = callbackifyOrDefault(config.tickSizeOuter, () => 6);
    this.axisType = callbackifyOrDefault(config.axisType, () => AxisType.Left);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: (d) => d.a.id },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      {
        key: "transform",
        property: (d) => `translate(${this.x(d)}, ${this.y(d)})`,
      },
    ]);
  }

  buildScale(d: AnnotationDatum<A, C>) {
    return d3
      .scaleLinear()
      .domain(this.domain(d).slice().reverse())
      .range(this.range(d));
  }
}

/**
 * This renders Annotations as vertical axes in a chart. This is intended to be used in conjunction with one of the
 * plotting glyph modules.
 * @param config The parameters for configuring the styling of the axes.
 */
export function verticalAxis<A extends Annotation, C extends Chart<any>>(
  config: VerticalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-vertical-axis-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  let modifier = new VerticalAxisModifier({
    selector,
    selection: binding.merge,
    ...config,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
