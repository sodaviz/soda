import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphProperty } from "../glyph-utilities/glyph-modifier";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { Orientation } from "../annotations/orientation";

export * from "./chevron/chevron-line";
export * from "./chevron/chevron-rectangle";

/**
 * An interface that defines the common parameters for calls to chevron glyph rendering functions.
 */
export interface ChevronGlyphConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * This defines the direction that the chevron arrows will point.
   */
  orientation?: GlyphProperty<A, C, Orientation>;
  /**
   * This defines the height of the chevron arrows.
   */
  chevronHeight?: GlyphProperty<A, C, number>;
  /**
   * This defines the width of the chevron arrows.
   */
  chevronWidth?: GlyphProperty<A, C, number>;
  /**
   * This defines the stroke color of the chevron arrows.
   */
  chevronStrokeColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the stroke opacity of the chevron arrows.
   */
  chevronStrokeOpacity?: GlyphProperty<A, C, number>;
  /**
   * This defines the fill color of the chevron arrows.
   */
  chevronFillColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the fill opacity of the chevron arrows.
   */
  chevronFillOpacity?: GlyphProperty<A, C, number>;
  /**
   * This defines the spacing between each chevron arrow.
   */
  chevronSpacing?: GlyphProperty<A, C, number>;
}
