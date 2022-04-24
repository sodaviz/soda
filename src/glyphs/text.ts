import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { generateId } from "../utilities/id-generation";
import { bind } from "../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
} from "../glyph-utilities/glyph-modifier";

const textMap: Map<string, string[]> = new Map();
const thresholdMap: Map<string, number[]> = new Map();

/**
 * A helper function that decides what text to render in a text glyph given the Chart's zoom level.
 * @internal
 * @param a
 * @param c
 */
export function selectText(a: Annotation, c: Chart<any>): string {
  let thresholds = thresholdMap.get(a.id);
  if (thresholds === undefined) {
    console.error(
      `text thresholds undefined for annotation: ${a.id}, returning empty string`
    );
    return "";
  }

  let text = textMap.get(a.id);
  if (text === undefined) {
    console.error(
      `text undefined for annotation: ${a.id} returning empty string`
    );
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
 * A utility function that gets the computed size of a string when rendered in the browser.
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
 * A utility function that maps the multiple levels of text detail to Annotations for later use.
 * @internal
 * @param config
 */
function addToTextMaps<A extends Annotation, C extends Chart<any>>(config: {
  annotations: A[];
  chart: C;
  textFn: (a: A, c: C) => string[];
}): void {
  for (const a of config.annotations) {
    let text = config.textFn(a, config.chart);
    textMap.set(a.id, text);
    let thresholds = text.map((t) => {
      let textSize = getTextSize(t);
      return ((a.end - a.start) * config.chart.viewportWidth) / textSize;
    });
    thresholdMap.set(a.id, thresholds);
  }
}

/**
 * An interface that defines the parameters for a call to the text rendering function.
 */
export interface TextConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * The font size of the text.
   */
  fontSize?: GlyphProperty<A, C, number>;
  /**
   * The weight of the font: normal, bold, bolder, lighter. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight
   */
  fontWeight?: GlyphProperty<A, C, string>;
  /**
   * The font family that will be used. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family
   */
  fontFamily?: GlyphProperty<A, C, string>;
  /**
   * The font style: normal, italic, or oblique. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style
   */
  fontStyle?: GlyphProperty<A, C, string>;
  /**
   * Where the text is aligned to: start, middle, or end. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
   */
  textAnchor?: GlyphProperty<A, C, string>;
  /**
   * How the text glyph is aligned with it's parent. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline
   */
  alignmentBaseline?: GlyphProperty<A, C, string>;
  /**
   * A callback to extract a list of text to display from the represented Annotation object. It is a list of text
   * because TextGlyphs can display varying length text depending on how much room is available at the Chart's
   * current zoom level.
   * @param a
   * @param c
   */
  textFn: (a: A, c: C) => string[];
  initializeFn?: (this: TextModifier<A, C>) => void;
  zoomFn?: (this: TextModifier<A, C>) => void;
}

/**
 * An interface that defines the parameters to instantiate a TextModifier.
 * @internal
 */
export type TextModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & TextConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of text glyphs.
 * @internal
 */
export class TextModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  textAnchor: GlyphProperty<A, C, string>;
  fontSize: GlyphProperty<A, C, number>;
  fontWeight: GlyphProperty<A, C, string>;
  fontFamily: GlyphProperty<A, C, string>;
  fontStyle: GlyphProperty<A, C, string>;
  alignmentBaseline: GlyphProperty<A, C, string>;

  constructor(config: TextModifierConfig<A, C>) {
    super(config);
    addToTextMaps(config);
    this.fillColor = config.fillColor || "black";
    this.strokeColor = config.strokeColor || "none";
    this.textAnchor = config.textAnchor || "start";
    this.fontSize = config.fontSize || 12;
    this.fontWeight = config.fontWeight || "normal";
    this.fontFamily = config.fontFamily || "Titillium Web, Arial, sans-serif";
    this.fontStyle = config.fontStyle || "normal";
    this.alignmentBaseline = config.alignmentBaseline || "hanging";
  }

  defaultInitialize(): void {
    super.defaultInitialize();
    this.applyTextAnchor();
    this.applyFontSize();
    this.applyFontWeight();
    this.applyFontFamily();
    this.applyFontStyle();
    this.applyAlignmentBaseline();
    this.applyText();
  }

  defaultZoom(): void {
    this.applyX();
    this.applyY();
    this.applyText();
  }

  applyText(): void {
    this.selection.text((d) => selectText(d.a, d.c));
  }

  applyTextAnchor(): void {
    this.applyStyle("text-anchor", this.textAnchor);
  }

  applyFontSize(): void {
    this.applyStyle("font-size", this.fontSize);
  }

  applyFontWeight(): void {
    this.applyStyle("font-weight", this.fontWeight);
  }

  applyFontFamily(): void {
    this.applyStyle("font-family", this.fontFamily);
  }

  applyFontStyle(): void {
    this.applyStyle("font-style", this.fontStyle);
  }

  applyAlignmentBaseline(): void {
    this.applyStyle("alignment-baseline", this.alignmentBaseline);
  }
}

/**
 * This renders a list of Annotation objects as text in a Chart.
 * @param config
 */
export function text<A extends Annotation, C extends Chart<any>>(
  config: TextConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-text-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGTextElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "text",
  });

  let modifier = new TextModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
