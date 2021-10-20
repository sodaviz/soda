import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "./glyph-config";
import { generateId } from "../utilities/id-generation";
import { AnnotationDatum, bind } from "./bind";
import {
  GlyphCallback,
  GlyphModifier,
  GlyphProperty,
  resolveValue,
} from "./glyph-modifier";

/**
 * @internal
 * @param x
 * @param w
 * @param y
 * @param h
 */
export function buildArcPathDFn<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
>(
  x: GlyphProperty<A, C, number>,
  w: GlyphProperty<A, C, number>,
  y: GlyphProperty<A, C, number>,
  h: GlyphProperty<A, C, number>
): GlyphCallback<A, C, string> {
  return (d) => {
    let mx = resolveValue(x, d);
    let my = resolveValue(y, d);
    let qx1 = resolveValue(x, d) + resolveValue(w, d) / 2;
    let qy1 = resolveValue(y, d) - d.c.rowHeight * 2;
    let qx = resolveValue(x, d) + resolveValue(w, d);
    let qy = resolveValue(y, d);
    return `M ${mx},${my} Q ${qx1},${qy1} ${qx},${qy}`;
  };
}

export class ArcModifier<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends GlyphModifier<A, C> {
  d: GlyphProperty<A, C, string | null>;
  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>,
    config: ArcConfig<A, C>
  ) {
    super(selector, selection, config);
    this.y = (d) => d.c.rowHeight * (d.a.y + 1);
    this.d = buildArcPathDFn(this.x, this.width, this.y, this.height);
    this.strokeColor = "black";
  }
  zoom(): void {
    this.setD();
  }
  setD(): void {
    this.setAttr("d", this.d);
  }
}

/**
 * An interface that holds the parameters for rendering arc glyphs.
 */
export interface ArcConfig<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends GlyphConfig<A, C> {}

/**
 * This renders a list of Annotation objects in a target chart as arcs.
 * @param chart The target Chart.
 * @param ann The list of Annotation objects to be rendered.
 * @param config The parameters for configuring the style of the lines.
 */
export function arc<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
>(config: ArcConfig<A, C>): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-arc-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGPathElement>(selector, "path", config);

  let modifier = new ArcModifier(internalSelector, binding.merge, config);
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
