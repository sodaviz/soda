import * as d3 from "d3";
import { BindTarget } from "./bind";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphProperty } from "./glyph-modifier";

export interface GlyphConfig<A extends Annotation, C extends Chart<any>> {
  /**
   * The Chart object in which the glyphs will be rendered.
   */
  chart: C;
  /**
   * A list of Annotation objects that will be used to render the glyphs.
   */
  annotations: A[];
  /**
   * The string that will be used to uniquely identify the call to the glyph rendering function.
   * In the DOM, the glyphs' elements will have this assigned as an ID.
   * If the same selector is supplied to two distinct calls to the same glyph function,
   * the rendering results of the first call will be cleared and replaced with the results of the second.
   */
  selector?: string;
  /**
   * This determines the parent DOM element in which the glyphs will be rendered.
   * When supplying a BindTarget, the rendering function will find the appropriate parent in the supplied Chart.
   * When supplying a D3 selection, the rendering function will explicitly use the selected element.
   */
  target?: BindTarget | d3.Selection<any, any, any, any>;
  /**
   * A callback to define the pixel y coordinate of the glyph
   * @param a
   * @param c
   */
  y?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel x coordinate of the glyph.
   * @param a
   * @param c
   */
  x?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel width of the glyph.
   * @param a
   * @param c
   */
  width?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel height of the glyph.
   * @param a
   * @param c
   */
  height?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the width of the border around the glyph.
   * @param a
   * @param c
   */
  strokeWidth?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the color of the border around the glyph.
   * @param a
   * @param c
   */
  strokeColor?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the opacity of the border around the glyph.
   * @param a
   * @param c
   */
  strokeOpacity?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the stroke dash array of the glyph.
   * See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
   * @param a
   * @param c
   */
  strokeDashArray?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the offset for the stroke dash array (if supplied) of the glyph.
   * See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
   * @param a
   * @param c
   */
  strokeDashOffset?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the stroke linecap of the glyph.
   * See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
   * @param a
   * @param c
   */
  strokeLineCap?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the offset for the stroke linejoin of the glyph.
   * See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
   * @param a
   * @param c
   */
  strokeLineJoin?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the fill color of the glyph.
   * @param a
   * @param c
   */
  fillColor?: GlyphProperty<A, C, string>;
  /**
   * A callback to define the fill opacity of the glyph.
   * @param a
   * @param c
   */
  fillOpacity?: GlyphProperty<A, C, number>;
  /**
   * A callback function that will be passed to the GlyphModifier that will manage the glyphs created with this
   * config. If provided, this callback function will override the GlyphModifier's initialization method, which
   * typically sets most of the style related properties from the GlyphConfig. Don't use this unless you know what
   * you're doing.
   */
  initializeFn?: (this: any) => void;
  /**
   * A callback function that will be passed to the GlyphModifier that will manage the glyphs created with this
   * config. If provided, this callback function will override the GlyphModifier's zoom method, which typically sets
   * most of the positioning related properties from the GlyphConfig. Don't use this unless you know what
   * you're doing.
   */
  zoomFn?: (this: any) => void;
}
