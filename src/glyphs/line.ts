import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { generateId } from "../utilities/id-generation";
import { GlyphConfig } from "./glyph-config";
import { AnnotationDatum, bind } from "./bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
} from "./glyph-modifier";

export function defaultLineModifierZoom<
  A extends Annotation,
  C extends Chart<any>
>(this: LineModifier<A, C>) {
  this.setX1();
  this.setX2();
  this.setY1();
  this.setY2();
}

/**
 * An interface that holds the parameters for rendering generic line glyphs.
 */
export interface LineConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * A callback to define the pixel x1 coordinate of the line glyph.
   * @param a
   * @param c
   */
  x1?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel x2 coordinate of the line glyph.
   * @param a
   * @param c
   */
  x2?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel y1 coordinate of the line glyph.
   * @param a
   * @param c
   */
  y1?: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel y2 coordinate of the line glyph.
   * @param a
   * @param c
   */
  y2?: GlyphProperty<A, C, number>;
  /**
   *
   */
  initializeFn?: (this: LineModifier<A, C>) => void;
  /**
   *
   */
  zoomFn?: (this: LineModifier<A, C>) => void;
}

export type LineModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & LineConfig<A, C>;

export class LineModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  /**
   * A callback to define the pixel x1 coordinate of the line glyph.
   * @param a
   * @param c
   */
  x1: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel x2 coordinate of the line glyph.
   * @param a
   * @param c
   */
  x2: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel y1 coordinate of the line glyph.
   * @param a
   * @param c
   */
  y1: GlyphProperty<A, C, number>;
  /**
   * A callback to define the pixel y2 coordinate of the line glyph.
   * @param a
   * @param c
   */
  y2: GlyphProperty<A, C, number>;
  zoomFn: (this: LineModifier<A, C>) => void;

  public constructor(config: LineModifierConfig<A, C>) {
    super(config);
    this.x1 =
      config.x1 ||
      config.x ||
      ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x));
    this.x2 = config.x2 || ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x2));
    this.y1 =
      config.y1 ||
      config.y ||
      ((d: AnnotationDatum<A, C>) => (d.a.row + 0.5) * d.c.rowHeight);
    this.y2 = config.y2 || this.y1;
    this.strokeColor = config.strokeColor || "black";
    this.zoomFn = config.zoomFn || defaultLineModifierZoom;
  }

  setX1(): void {
    this.setAttr("x1", this.x1);
  }

  setX2(): void {
    this.setAttr("x2", this.x2);
  }

  setY1(): void {
    this.setAttr("y1", this.y1);
  }

  setY2(): void {
    this.setAttr("y2", this.y2);
  }
}

/**
 * This renders a list of Annotation objects in a target chart as lines.
 * @param config The parameters for configuring the style of the lines.
 */
export function line<A extends Annotation, C extends Chart<any>>(
  config: LineConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-line-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGLineElement>(selector, "line", config);

  let modifier = new LineModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });

  modifier.initialize();
  config.chart.glyphModifiers.push(modifier);

  return binding.g;
}
