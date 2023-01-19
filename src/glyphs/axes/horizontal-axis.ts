import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisConfig, AxisModifier, AxisType } from "../axes";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import { GlyphModifierConfig } from "../../glyph-utilities/glyph-modifier";
import {
  callbackifyOrDefault,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the horizontalAxis rendering function.
 */
export interface HorizontalAxisConfig<
  A extends Annotation,
  C extends Chart<any>
> extends AxisConfig<A, C> {
  /**
   * This determines whether the ticks and labels will be placed on the top or the bottom of the axis.
   */
  axisType?: GlyphProperty<A, C, AxisType.Bottom | AxisType.Top>;
  /**
   * If this is set to true, the axis glyph will not translate or scale during zoom events.
   */
  fixed?: boolean;
}

/**
 * A class that manages the styling and positioning of a group of horizontal axis glyphs.
 * @internal
 */
export class HorizontalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends AxisModifier<A, C> {
  constructor(config: GlyphModifierConfig<A, C> & HorizontalAxisConfig<A, C>) {
    super(config);

    if (config.fixed) {
      this.domain = callbackifyOrDefault(config.domain, (d) => [
        d.c.xScale.invert(0),
        d.c.xScale.invert(d.c.viewportWidthPx - 1),
      ]);
      this.range = callbackifyOrDefault(config.range, (d) => [
        0,
        d.c.viewportWidthPx - 1,
      ]);
    } else {
      this.domain = callbackifyOrDefault(config.domain, (d) => [
        d.a.start,
        d.a.start + (d.a.end - d.a.start),
      ]);
      this.range = callbackifyOrDefault(config.range, (d) => [
        d.c.xScale(d.a.start),
        d.c.xScale(d.a.start + (d.a.end - d.a.start)),
      ]);
    }

    this.axisType = callbackifyOrDefault(
      config.axisType,
      () => AxisType.Bottom
    );

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: (d) => d.a.id },
      {
        key: "transform",
        property: (d) => `translate(0, ${this.y(d)})`,
      },
    ]);
  }

  buildScale(d: AnnotationDatum<A, C>) {
    return d3.scaleLinear().domain(this.domain(d)).range(this.range(d));
  }
}

/**
 * This renders Annotations as horizontal axes in a Chart.
 * @param config
 */
export function horizontalAxis<A extends Annotation, C extends Chart<any>>(
  config: HorizontalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-horizontal-axis-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  let modifier = new HorizontalAxisModifier({
    selector: selector,
    selection: binding.merge,
    ...config,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
