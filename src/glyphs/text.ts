import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
} from "../glyph-utilities/glyph-modifier";

/**
 * @internal
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
  initializeFn?: (this: TextModifier<A, C>) => void;
  zoomFn?: (this: TextModifier<A, C>) => void;
}

/**
 * @internal
 */
export type TextModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & TextConfig<A, C>;

/**
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
  }

  defaultZoom(): void {
    this.applyX();
    this.applyY();
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
