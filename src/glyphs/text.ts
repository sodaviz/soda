import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "./glyph-config";
import { generateId } from "../utilities/id-generation";
import { AnnotationDatum, bind } from "./bind";
import { GlyphModifier, GlyphProperty } from "./glyph-modifier";

const textMap: Map<string, string[]> = new Map();
const thresholdMap: Map<string, number[]> = new Map();

/**
 * @internal
 * @param a
 * @param c
 */
export function selectText(a: Annotation, c: Chart): string {
  let thresholds = thresholdMap.get(a.id);
  if (thresholds === undefined) {
    console.error(
      "text thresholds undefined for annotation",
      a,
      "returning empty string"
    );
    return "";
  }

  let text = textMap.get(a.id);
  if (text === undefined) {
    console.error("text undefined for annotation", a, "returning empty string");
    return "";
  }

  let i = 0;
  let viewWidth = c.getSemanticViewRange().width;
  for (const thresh of thresholds) {
    if (viewWidth <= thresh) {
      return text[i];
    }
    i++;
  }
  return "";
}

/**
 * @internal
 * @param text
 */
function getTextSize(text: string): number {
  let selection = d3.select("body").append("svg");

  let width = selection
    .append("text")
    .attr("class", "tmp-text")
    .text(text)
    .node()!
    .getComputedTextLength();

  selection.remove();
  return width;
}

/**
 * @internal
 * @param config
 */
function addToTextMaps<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
>(config: {
  annotations: A[];
  chart: C;
  textFn: (a: A, c: C) => string[];
}): void {
  for (const a of config.annotations) {
    let text = config.textFn(a, config.chart);
    textMap.set(a.id, text);
    let thresholds = text.map((t) => {
      let textSize = getTextSize(t);
      return (a.w * config.chart.viewportWidth) / textSize;
    });
    thresholdMap.set(a.id, thresholds);
  }
}

export interface TextConfig<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends GlyphConfig<A, C> {
  textAnchor?: GlyphProperty<A, C, string>;
  alignmentBaseline?: GlyphProperty<A, C, string>;
  /**
   * A callback to extract a list of text to display from the represented Annotation object. It is a list of text
   * because TextGlyphs can display varying length text depending on how much room is available in the
   * target Chart's SVG viewport.
   * @param a
   * @param c
   */
  textFn: (a: A, c: C) => string[];
}

export class TextModifier<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends GlyphModifier<A, C> {
  textAnchor: GlyphProperty<A, C, string>;
  alignmentBaseline: GlyphProperty<A, C, string>;

  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>,
    config: TextConfig<A, C>
  ) {
    super(selector, selection, config);
    addToTextMaps(config);

    this.textAnchor = config.textAnchor || "left";
    this.alignmentBaseline = config.alignmentBaseline || "hanging";
  }
  initialize(): void {
    super.initialize();
    this.setTextAnchor();
    this.setAlignmentBaseline();
    this.setText();
  }

  setText(): void {
    this.selection.text((d) => selectText(d.a, d.c));
  }

  setTextAnchor(): void {
    this.setStyle("text-anchor", this.textAnchor);
  }

  setAlignmentBaseline(): void {
    this.setStyle("alignment-baseline", this.alignmentBaseline);
  }

  zoom(): void {
    this.setX();
    this.setY();
    this.setText();
  }
}

/**
 * This renders a list of Annotation objects in a target chart as text glyphs. These are most likely to be used as
 * labels that will be affixed next to another glyph.
 * @param chart The target Chart.
 * @param ann The list of Annotation objects to be rendered.
 * @param config The parameters for configuring the style of the lines.
 */
export function text<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
>(config: TextConfig<A, C>): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-text-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGTextElement>(selector, "text", config);

  let modifier = new TextModifier(internalSelector, binding.merge, config);
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
