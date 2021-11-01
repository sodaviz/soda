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

export interface GlyphModifierConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  selector: string;
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
}

// TypeScript allows declaration merging, which essentially combines multiple declarations into a single definition
// In this case, we're using it to let GlyphModifier easily inherit the properties in GlyphConfig.
/**
 *
 */
export interface GlyphModifier<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {}

/**
 *
 */
export class GlyphModifier<A extends Annotation, C extends Chart<any>> {
  selector: string;
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
  y: GlyphProperty<A, C, number>;
  x: GlyphProperty<A, C, number>;
  width: GlyphProperty<A, C, number>;
  height: GlyphProperty<A, C, number>;
  initializeFn: (this: any) => void;
  zoomFn: (this: any) => void;

  constructor(config: GlyphModifierConfig<A, C>) {
    this.selector = config.selector;
    this.selection = config.selection;
    this.chart = config.chart;
    this.annotations = config.annotations;
    this.x = config.x || ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x));
    this.y =
      config.y || ((d: AnnotationDatum<A, C>) => d.a.y * d.c.rowHeight + 2);
    this.width =
      config.width ||
      ((d: AnnotationDatum<A, C>) => d.c.xScale(d.a.x2) - d.c.xScale(d.a.x));
    this.height =
      config.height || ((d: AnnotationDatum<A, C>) => d.c.rowHeight - 4);
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

  initialize(): void {
    this.initializeFn();
  }

  zoom(): void {
    this.zoomFn();
  }

  defaultInitialize() {
    this.applyId();
    this.applyClass();
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

  defaultZoom() {
    this.applyX();
    this.applyWidth();
    this.applyY();
    this.applyHeight();
  }

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
