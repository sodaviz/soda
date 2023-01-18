import { Annotation } from "../../annotations/annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { bind } from "../../glyph-utilities/bind";
import { TextConfig, TextModifier } from "../text";
import { GlyphModifierConfig } from "../../glyph-utilities/glyph-modifier";
import {
  callbackify,
  GlyphCallback,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the text rendering function.
 */
export interface SimpleTextConfig<A extends Annotation, C extends Chart<any>>
  extends TextConfig<A, C> {
  /**
   * The text to display in the glyph.
   * @param a
   * @param c
   */
  text: GlyphProperty<A, C, string>;
}

/**
 * A class that manages the styling and positioning of a group of text glyphs.
 * @internal
 */
export class SimpleTextModifier<
  A extends Annotation,
  C extends Chart<any>
> extends TextModifier<A, C> {
  text: GlyphCallback<A, C, string>;

  constructor(config: GlyphModifierConfig<A, C> & SimpleTextConfig<A, C>) {
    super(config);
    this.text = callbackify(config.text);
  }

  initialize(): void {
    super.initialize();
    this.selection.text(this.text);
  }
}

/**
 * This renders a list of Annotation objects as text in a Chart.
 * @param config
 */
export function simpleText<A extends Annotation, C extends Chart<any>>(
  config: SimpleTextConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-text-glyph");

  let binding = bind<A, C, SVGTextElement>({
    ...config,
    selector,
    elementType: "text",
  });

  let modifier = new SimpleTextModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
