import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { ContinuousAnnotation } from "../annotations/continuous-annotation";
import { GlyphProperty, resolveValue } from "../glyph-utilities/glyph-modifier";
import { AnnotationDatum } from "../glyph-utilities/bind";

export * from "./plots/bar-plot";
export * from "./plots/line-plot";
export * from "./plots/heatmap";

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
  domainStart?: GlyphProperty<A, C, number>;
  domainEnd?: GlyphProperty<A, C, number>;
  rangeStart?: GlyphProperty<A, C, number>;
  rangeEnd?: GlyphProperty<A, C, number>;
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
  let domainStart = config.domainStart || (() => 0);
  let domainEnd =
    config.domainEnd || ((d: AnnotationDatum<A, C>) => d.a.maxValue);
  let rangeStart = config.rangeStart || (() => 0);
  let rangeEnd =
    config.rangeEnd || ((d: AnnotationDatum<A, C>) => d.c.rowHeight * rowSpan);

  for (const d of config.data) {
    map.set(
      d.a.id,
      d3
        .scaleLinear()
        .domain([resolveValue(domainStart, d), resolveValue(domainEnd, d)])
        .range([resolveValue(rangeStart, d), resolveValue(rangeEnd, d)])
    );
  }
}
