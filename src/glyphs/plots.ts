import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { PlotAnnotation } from "../annotations/plot-annotation";
import { AnnotationDatum } from "../glyph-utilities/bind";
import {
  GlyphProperty,
  resolveGlyphProperty,
} from "../glyph-utilities/glyph-property";

/**
 * This defines the parameters for a call to the setYScales function.
 * @internal
 */
export interface YScaleConfig<A extends PlotAnnotation, C extends Chart<any>> {
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
  A extends PlotAnnotation,
  C extends Chart<any>
>(
  map: Map<string, d3.ScaleLinear<number, number>>,
  config: YScaleConfig<A, C>
): void {
  let rowSpan = config.rowSpan || 1;
  let domain = config.domain || [0, 1];
  let range =
    config.range ||
    ((d: AnnotationDatum<A, C>) => [0, d.c.rowHeight * rowSpan - 4]);

  for (const d of config.data) {
    map.set(
      d.a.id,
      d3
        .scaleLinear()
        .domain(resolveGlyphProperty(domain, d))
        .range(resolveGlyphProperty(range, d))
    );
  }
}
