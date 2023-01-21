import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { generateId } from "../utilities/id-generation";
import { bind } from "../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";
import {
  GlyphCallback,
  GlyphProperty,
} from "../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the arc rendering function.
 */
export interface ArcConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {}

/**
 * @internal
 * @param x
 * @param w
 * @param y
 * @param h
 */
export function buildArcPathDFn<A extends Annotation, C extends Chart<any>>(
  x: GlyphCallback<A, C, number>,
  w: GlyphCallback<A, C, number>,
  y: GlyphCallback<A, C, number>,
  h: GlyphCallback<A, C, number>
): GlyphCallback<A, C, string> {
  return (d) => {
    let width = w(d);
    let x1 = x(d);
    let y1 = y(d);
    let x2 = x1 + width / 2;
    let y2 = y1 - h(d) * 2;
    let x3 = x1 + width;
    return `M ${x1},${y1} Q ${x2},${y2} ${x3},${y1}`;
  };
}

/**
 * A class that manages the styling and positioning of a group of arc glyphs.
 * @internal
 */
export class ArcModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  d: GlyphProperty<A, C, string>;

  constructor(config: GlyphModifierConfig<A, C> & ArcConfig<A, C>) {
    super(config);
    this.y = (d) => (this.row(d) + 1) * d.c.rowHeight - 2;
    this.d = buildArcPathDFn(this.x, this.width, this.y, this.height);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor || "black" },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor || "none" },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "d", property: this.d },
    ]);
  }
}

/**
 * This renders a list of Annotation objects as arcs in a Chart.
 * @param config
 */
export function arc<A extends Annotation, C extends Chart<any>>(
  config: ArcConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-arc-glyph");

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    elementType: "path",
  });

  let modifier = new ArcModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
