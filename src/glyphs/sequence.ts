import { SequenceAnnotation } from "../annotations/sequence-annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { generateId } from "../utilities/id-generation";
import { AnnotationDatum, bind } from "./bind";
import { GlyphModifier, resolveValue } from "./glyph-modifier";
import { GlyphConfig } from "./glyph-config";

/**
 * @internal
 */
export const sequenceYFn = <
  S extends SequenceAnnotation = SequenceAnnotation,
  C extends Chart<any> = Chart
>(
  s: S,
  c: C
) => (s.y + 1) * c.rowHeight;

/**
 * An interface that holds the parameters for rendering sequence glyphs.
 */
export interface SequenceConfig<
  S extends SequenceAnnotation = SequenceAnnotation,
  C extends Chart<any> = Chart
> extends GlyphConfig<S, C> {}

export class SequenceModifier<
  S extends SequenceAnnotation = SequenceAnnotation,
  C extends Chart<any> = Chart
> extends GlyphModifier<S, C> {
  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<S, C>, any, any>,
    config: SequenceConfig<S, C>
  ) {
    super(selector, selection, config);
    this.y =
      config.y || ((d: AnnotationDatum<S, C>) => d.c.rowHeight * (d.a.y + 1));
  }

  initialize(): void {
    this.selection
      .selectAll("text")
      .data((d: AnnotationDatum<S, C>) => d.a.characters)
      .enter()
      .append("text")
      .text((c: [number, string]) => c[1])
      .style("text-anchor", "middle");
  }

  zoom(): void {
    this.setX();
    this.setY();
  }

  setX(): void {
    this.selection
      .selectAll<SVGTextElement, [number, string]>("text")
      .attr("x", (c) => this.chart.xScale(c[0]))
      .attr("y", 0);
  }

  setY(): void {
    this.setAttr(
      "transform",
      (d) => `translate(0, ${resolveValue(this.y, d)})`
    );
  }
}
/**
 * An experimental function that renders a list of Annotation objects in a target chart as sequence glyphs. In a
 * sequence glyph, each integer semantic coordinate that the Annotation covers is rendered as a character. This
 * works, but it is very hard on performance.
 * @param chart
 * @param ann
 * @param config
 */
export function sequence<
  S extends SequenceAnnotation = SequenceAnnotation,
  C extends Chart<any> = Chart
>(config: SequenceConfig<S, C>): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-sequence-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<S, C, SVGGElement>(selector, "g", config);

  let modifier = new SequenceModifier(internalSelector, binding.merge, config);
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
