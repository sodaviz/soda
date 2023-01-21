import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";
import {
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
} from "../glyph-utilities/glyph-property";

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
   * How the text aligns horizontally: start, middle, or end. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
   */
  textAnchor?: GlyphProperty<A, C, string>;
  /**
   * How the text aligns vertically: auto, middle, hanging.
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
   */
  dominantBaseline?: GlyphProperty<A, C, string>;
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
  textAnchor: GlyphCallback<A, C, string>;
  fontSize: GlyphCallback<A, C, number>;
  fontWeight: GlyphCallback<A, C, string>;
  fontFamily: GlyphCallback<A, C, string>;
  fontStyle: GlyphCallback<A, C, string>;

  constructor(config: TextModifierConfig<A, C>) {
    super(config);
    this.textAnchor = callbackifyOrDefault(config.textAnchor, () => "start");
    this.fontSize = callbackifyOrDefault(config.fontSize, () => 12);
    this.fontWeight = callbackifyOrDefault(config.fontWeight, () => "normal");
    this.fontFamily = callbackifyOrDefault(
      config.fontFamily,
      () => "Titillium Web, Arial, sans-serif"
    );
    this.fontStyle = callbackifyOrDefault(config.fontStyle, () => "normal");

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "y", property: this.y },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "font-family", property: this.fontFamily },
      { key: "text-anchor", property: this.textAnchor },
      { key: "font-size", property: this.fontSize },
      { key: "font-weight", property: this.fontWeight },
      { key: "font-style", property: this.fontStyle },
      {
        key: "dominant-baseline",
        property: config.dominantBaseline || "hanging",
      },
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "x", property: this.x },
    ]);
  }
}
