import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { ContinuousAnnotation } from "../annotations/continuous-annotation";
import { GlyphProperty, resolveValue } from "../glyph-utilities/glyph-modifier";
import { AnnotationDatum } from "../glyph-utilities/bind";

/**
 * This defines the parameters for a call to the setYScales function.
 * @internal
 */
export interface YScaleConfig<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> {
  chart: C;
  data: AnnotationDatum<A, C>[];
  rowSpan?: number;
  domain?: GlyphProperty<A, C, [number, number]>;
  range?: GlyphProperty<A, C, [number, number]>;
}

/**
 * This is a helper function for setting up and storing d3 scales that are used when rendering plot glyphs
 * @internal
 * @param map
 * @param config
 */
export function initializePlotGlyphYScales<
  A extends ContinuousAnnotation,
  C extends Chart<any>
>(
  map: Map<string, d3.ScaleLinear<number, number>>,
  config: YScaleConfig<A, C>
): void {
  let rowSpan = config.rowSpan || 1;
  let domain =
    config.domain || ((d: AnnotationDatum<A, C>) => [0, d.a.maxValue]);
  let range =
    config.range ||
    ((d: AnnotationDatum<A, C>) => [0, d.c.rowHeight * rowSpan]);

  for (const d of config.data) {
    map.set(
      d.a.id,
      d3
        .scaleLinear()
        .domain(resolveValue(domain, d))
        .range(resolveValue(range, d))
    );
  }
}
