import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphProperty } from "./glyph-modifier";
import { GlyphConfig } from "./glyph-config";
import { Orientation } from "../annotations/oriented-annotation";

export * from "./chevron/chevron-line";
export * from "./chevron/chevron-rectangle";

export interface ChevronGlyphConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * A callback function that returns an Orientation. The Orientation is used to determine which direction the
   * chevron glyph will point towards.
   */
  orientation?: GlyphProperty<A, C, Orientation>;
  chevronHeight?: GlyphProperty<A, C, number>;
  chevronWidth?: GlyphProperty<A, C, number>;
  chevronStrokeColor?: GlyphProperty<A, C, string>;
  chevronStrokeOpacity?: GlyphProperty<A, C, number>;
  chevronFillColor?: GlyphProperty<A, C, string>;
  chevronFillOpacity?: GlyphProperty<A, C, number>;
  chevronSpacing?: GlyphProperty<A, C, number>;
}
