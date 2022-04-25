import { Annotation } from "../../annotations/annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { bind } from "../../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";
import { TextConfig, TextModifier } from "../text";

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
  text: GlyphProperty<A, C, string[]>;
}): void {
  for (const a of config.annotations) {
    let text = resolveValue(config.text, { a, c: config.chart });
    textMap.set(a.id, text);
    let thresholds = text.map((t) => {
      let textSize = getTextSize(t);
      return ((a.end - a.start) * config.chart.viewportWidth) / textSize;
    });
    thresholdMap.set(a.id, thresholds);
  }
}

/**
 * An interface that defines the parameters for a call to the dynamicText rendering function.
 */
export interface DynamicTextConfig<A extends Annotation, C extends Chart<any>>
  extends TextConfig<A, C> {
  /**
   * A callback to extract a list of text to display from the represented Annotation object. It is a list of text
   * because TextGlyphs can display varying length text depending on how much room is available at the Chart's
   * current zoom level.
   * @param a
   * @param c
   */
  text: GlyphProperty<A, C, string[]>;
}

/**
 * An interface that defines the parameters to instantiate a DynamicTextModifier.
 * @internal
 */
export type DynamicTextModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & DynamicTextConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of dynamic text glyphs.
 * @internal
 */
export class DynamicTextModifier<
  A extends Annotation,
  C extends Chart<any>
> extends TextModifier<A, C> {
  constructor(config: DynamicTextModifierConfig<A, C>) {
    super(config);
    addToTextMaps(config);
  }

  defaultInitialize(): void {
    super.defaultInitialize();
    this.applyText();
  }

  defaultZoom(): void {
    super.defaultZoom();
    this.applyText();
  }

  applyText(): void {
    this.selection.text((d) => selectText(d.a, d.c));
  }
}

/**
 * This renders a list of Annotation objects as text in a Chart.
 * @param config
 */
export function dynamicText<A extends Annotation, C extends Chart<any>>(
  config: DynamicTextConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-text-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGTextElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "text",
  });

  let modifier = new DynamicTextModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
