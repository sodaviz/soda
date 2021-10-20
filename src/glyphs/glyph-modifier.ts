import * as d3 from "d3";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "./glyph-config";
import { AnnotationDatum } from "./bind";

/**
 *
 */
export type GlyphCallback<A extends Annotation, C extends Chart<any>, V> = (
  d: AnnotationDatum<A, C>
) => V;

/**
 *
 */
export type GlyphProperty<A extends Annotation, C extends Chart<any>, V> =
  | GlyphCallback<A, C, V>
  | V;

/**
 * @internal
 * @param property
 */
export function isCallback<A extends Annotation, C extends Chart<any>, V>(
  property: GlyphProperty<A, C, V>
): property is GlyphCallback<A, C, V> {
  return typeof property === "function";
}

/**
 *
 * @param property
 * @param d
 */
export function resolveValue<A extends Annotation, C extends Chart<any>, V>(
  property: GlyphProperty<A, C, V>,
  d: AnnotationDatum<A, C>
): V {
  if (isCallback(property)) {
    return property(d);
  }
  return property;
}

// TypeScript allows declaration merging, which essentially combines multiple declarations into a single definition
// In this case, we're using it to let GlyphModifier easily inherit the properties in GlyphConfig.
/**
 *
 */
export interface GlyphModifier<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends GlyphConfig<A, C> {}

/**
 *
 */
export class GlyphModifier<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> {
  selector: string;
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
  y: GlyphProperty<A, C, number>;
  x: GlyphProperty<A, C, number>;
  width: GlyphProperty<A, C, number>;
  height: GlyphProperty<A, C, number>;

  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>,
    glyphConfig: GlyphConfig<A, C>
  ) {
    this.selector = selector;
    this.selection = selection;
    this.chart = glyphConfig.chart;
    this.annotations = glyphConfig.annotations;
    this.x = glyphConfig.x || ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x));
    this.y =
      glyphConfig.y ||
      ((d: AnnotationDatum<A, C>) => d.a.y * d.c.rowHeight + 2);
    this.width =
      glyphConfig.width ||
      ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x2) - d.c.xScale(d.a.x));
    this.height =
      glyphConfig.height || ((d: AnnotationDatum<A, C>) => d.c.rowHeight - 4);
    this.fillColor = glyphConfig.fillColor;
    this.fillOpacity = glyphConfig.fillOpacity;
    this.strokeColor = glyphConfig.strokeColor;
  }

  initialize(): void {
    this.setId();
    this.setClass();
    this.setStrokeColor();
    this.setFillColor();
    this.zoom();
  }

  zoom(): void {
    this.setX();
    this.sedWidth();
    this.setY();
    this.setHeight();
  }

  setAttr(
    attr: string,
    value:
      | GlyphCallback<A, C, string | number | boolean | null>
      | string
      | number
      | boolean
      | null
      | undefined
  ): void {
    // This is really annoying... the D3 typedefs define .attr() as a function with several overloads rather than a
    // function that takes union type parameters. I have to perform this type check to overcome the TypeScript
    // compiler's inability to figure out that it is perfectly acceptable for an overloaded function to accept the
    // union of all of the types in each overload signature.
    if (typeof value === "function") {
      // there is a specific overload for a ValueFn argument
      this.selection.attr(attr, value);
    } else if (value === null) {
      // one for null
      this.selection.attr(attr, value);
    } else if (value !== undefined) {
      // and one for a flat value
      this.selection.attr(attr, value);
    }
  }

  setStyle(
    style: string,
    value:
      | GlyphCallback<A, C, string | number | boolean | null>
      | string
      | number
      | boolean
      | null
      | undefined
  ): void {
    // Same story here as described above in setAttr()
    if (typeof value === "function") {
      this.selection.style(style, value);
    } else if (value === null) {
      this.selection.style(style, value);
    } else if (value !== undefined) {
      this.selection.style(style, value);
    }
  }

  setId(): void {
    this.selection.attr("id", (d) => d.a.id);
  }

  setClass(): void {
    this.selection.attr("class", this.selector);
  }

  setX(): void {
    this.setAttr("x", this.x);
  }

  setY(): void {
    this.setAttr("y", this.y);
  }

  sedWidth(): void {
    this.setAttr("width", this.width);
  }

  setHeight(): void {
    this.setAttr("height", this.height);
  }

  setStrokeWidth(): void {
    this.setStyle("stroke-width", this.strokeWidth);
  }

  setStrokeColor(): void {
    this.setStyle("stroke", this.strokeColor);
  }

  setFillColor(): void {
    this.setStyle("fill", this.fillColor);
  }
}
