import * as d3 from "d3";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "./glyph-config";
import { AnnotationDatum } from "./bind";

/**
 * A type that describes the callback functions used across SODA to define glyph properties dynamically.
 */
export type GlyphCallback<A extends Annotation, C extends Chart<any>, V> = (
  d: AnnotationDatum<A, C>
) => V;

/**
 * A type that is simply the union of GlyphCallback<A, C, V> and the value V that it returns.
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
 * A utility function that resolves the value from a GlyphProperty. If the property is a callback function, it will
 * be called to retrieve the value. Otherwise, it will just return the value.
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

/**
 * An interface that defines the parameters to initialize a GlyphModifier.
 * @internal
 */
export interface GlyphModifierConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * A string selector to the glyphs that the modifier manages.
   */
  selector: string;
  /**
   * A D3 selection of the glyphs that the modifier will manage.
   */
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
}

// TypeScript allows declaration merging, which essentially combines multiple declarations into a single definition
// In this case, we're using it to let GlyphModifier easily inherit the properties in GlyphConfig.
/**
 * @internal
 */
export interface GlyphModifier<A extends Annotation, C extends Chart<any>>
  extends GlyphModifierConfig<A, C> {}

/**
 * The base class that manages the styling and positioning of glyphs.
 * @internal
 */
export class GlyphModifier<A extends Annotation, C extends Chart<any>> {
  x: GlyphProperty<A, C, number>;
  row: GlyphProperty<A, C, number>;
  y: GlyphProperty<A, C, number>;
  width: GlyphProperty<A, C, number>;
  height: GlyphProperty<A, C, number>;
  initializeFn: (this: any) => void;
  zoomFn: (this: any) => void;

  constructor(config: GlyphModifierConfig<A, C>) {
    this.selector = config.selector;
    this.selection = config.selection;
    this.chart = config.chart;
    this.annotations = config.annotations;
    this.x =
      config.x != undefined
        ? config.x
        : (d: AnnotationDatum<A, C>) => d.c.xScale(d.a.start);
    this.row = config.row != undefined ? config.row : (d) => d.c.layout(d);
    this.y =
      config.y != undefined
        ? config.y
        : (d: AnnotationDatum<A, C>) =>
            resolveValue(this.row, d) * d.c.rowHeight + 2;
    this.width =
      config.width != undefined
        ? config.width
        : (d: AnnotationDatum<A, C>) =>
            d.c.xScale(d.a.end) - d.c.xScale(d.a.start);
    this.height =
      config.height != undefined
        ? config.height
        : (d: AnnotationDatum<A, C>) => d.c.rowHeight - 4;
    this.strokeWidth = config.strokeWidth;
    this.strokeColor = config.strokeColor || "black";
    this.strokeOpacity = config.strokeOpacity;
    this.strokeDashArray = config.strokeDashArray;
    this.strokeDashOffset = config.strokeDashOffset;
    this.strokeLineCap = config.strokeLineCap;
    this.strokeLineJoin = config.strokeLineJoin;
    this.strokeLineCap = config.strokeLineCap;
    this.fillColor = config.fillColor;
    this.fillOpacity = config.fillOpacity;

    this.initializeFn = config.initializeFn || this.defaultInitialize;
    this.zoomFn = config.zoomFn || this.defaultZoom;
  }

  /**
   * This calls the initializeFn property. It should be called after the GlyphModifier has been instantiated.
   */
  initialize(): void {
    this.initializeFn();
  }

  /**
   * This calls the zoomFn property. It should be called after a zoom event.
   */
  zoom(): void {
    this.zoomFn();
  }

  /**
   * The default initializeFn implementation. It applies pretty much every styling property exposed in GlyphConfig
   * and then calls zoom().
   */
  defaultInitialize() {
    this.applyId();
    this.applyStrokeWidth();
    this.applyStrokeColor();
    this.applyStrokeOpacity();
    this.applyStrokeDashArray();
    this.applyStrokeDashOffset();
    this.applyStrokeLineCap();
    this.applyStrokeLineJoin();
    this.applyFillColor();
    this.applyFillOpacity();
    this.zoom();
  }

  /**
   * The default zoomFn implementation. It just applies x, y, width, and height.
   */
  defaultZoom() {
    this.applyX();
    this.applyWidth();
    this.applyY();
    this.applyHeight();
  }

  /**
   * A helper function that sets an arbitrary attr on a DOM element using a GlyphCallback or a value.
   * @param attr
   * @param value
   */
  applyAttr(
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

  /**
   * A helper function that sets an arbitrary style on a DOM element using a GlyphCallback or a value.
   * @param style
   * @param value
   */
  applyStyle(
    style: string,
    value:
      | GlyphCallback<A, C, string | number | boolean | null>
      | string
      | number
      | boolean
      | null
      | undefined
  ): void {
    // Same story here as described above in applyAttr()
    if (typeof value === "function") {
      this.selection.style(style, value);
    } else if (value === null) {
      this.selection.style(style, value);
    } else if (value !== undefined) {
      this.selection.style(style, value);
    }
  }

  applyId(): void {
    this.selection.attr("id", (d) => d.a.id);
  }

  applyClass(): void {
    this.selection.attr("class", this.selector);
  }

  applyX(): void {
    this.applyAttr("x", this.x);
  }

  applyY(): void {
    this.applyAttr("y", this.y);
  }

  applyWidth(): void {
    this.applyAttr("width", this.width);
  }

  applyHeight(): void {
    this.applyAttr("height", this.height);
  }

  applyStrokeWidth(): void {
    this.applyStyle("stroke-width", this.strokeWidth);
  }

  applyStrokeColor(): void {
    this.applyStyle("stroke", this.strokeColor);
  }

  applyStrokeOpacity(): void {
    this.applyStyle("stroke-opacity", this.strokeOpacity);
  }

  applyStrokeDashArray(): void {
    this.applyStyle("stroke-dasharray", this.strokeDashArray);
  }

  applyStrokeDashOffset(): void {
    this.applyStyle("stroke-dashoffset", this.strokeDashOffset);
  }

  applyStrokeLineCap(): void {
    this.applyStyle("stroke-linecap", this.strokeLineCap);
  }

  applyStrokeLineJoin(): void {
    this.applyStyle("stroke-linejoin", this.strokeLineJoin);
  }

  applyFillColor(): void {
    this.applyStyle("fill", this.fillColor);
  }

  applyFillOpacity(): void {
    this.applyStyle("opacity", this.fillOpacity);
  }
}
