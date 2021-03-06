import { SequenceAnnotation } from "../annotations/sequence-annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { generateId } from "../utilities/id-generation";
import { AnnotationDatum, bind } from "../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  resolveValue,
} from "../glyph-utilities/glyph-modifier";
import { GlyphConfig } from "../glyph-utilities/glyph-config";

/**
 * An interface that defines the parameters for a call to the sequence rendering function.
 */
export interface SequenceConfig<
  S extends SequenceAnnotation,
  C extends Chart<any>
> extends GlyphConfig<S, C> {
  initializeFn?: (this: SequenceModifier<S, C>) => void;
  zoomFn?: (this: SequenceModifier<S, C>) => void;
}

/**
 * An interface that defines the parameters to instantiate a SequenceModifier.
 * @internal
 */
export type SequenceModifierConfig<
  S extends SequenceAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<S, C> & SequenceConfig<S, C>;

/**
 * A class that manages the styling and positioning of a group of sequence glyphs.
 * @internal
 */
export class SequenceModifier<
  S extends SequenceAnnotation,
  C extends Chart<any>
> extends GlyphModifier<S, C> {
  fontFamily: string;
  offset: number = 0;

  constructor(config: SequenceModifierConfig<S, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.y =
      config.y ||
      ((d: AnnotationDatum<S, C>) =>
        (resolveValue(this.row, d) + 1) * d.c.rowHeight - 2);
    this.x =
      config.x ||
      ((d: AnnotationDatum<S, C>) => d.c.xScale(d.a.start) - this.offset);

    this.fontFamily = "monospace";
    this.updateOffset();
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection.text((d) => d.a.sequence);
    this.applyFontFamily();
  }

  defaultZoom() {
    this.updateOffset();
    this.applyTextLength();
    this.applyX();
    this.applyY();
  }

  updateOffset() {
    let selection = d3.select("body").append("svg");

    let width = selection
      .append("text")
      .text("A")
      .attr("font-family", this.fontFamily)
      .node()!
      .getComputedTextLength();

    selection.remove();
    this.offset = width / 2;
  }

  applyFontFamily() {
    this.applyStyle("font-family", this.fontFamily);
  }

  applyTextLength() {
    this.applyAttr(
      "textLength",
      (d) =>
        d.c.xScale(d.a.start + (d.a.end - d.a.start) - 1) -
        d.c.xScale(d.a.start) +
        2 * this.offset
    );
  }
}

/**
 * This renders a list of SequenceAnnotation objects as sequence glyphs in a Chart.
 * @param config
 */
export function sequence<S extends SequenceAnnotation, C extends Chart<any>>(
  config: SequenceConfig<S, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-sequence-glyph");

  let binding = bind<S, C, SVGTextElement>({
    ...config,
    selector,
    elementType: "text",
  });

  let modifier = new SequenceModifier({
    ...config,
    selector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
