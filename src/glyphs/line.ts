import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { generateId } from "../utilities/id-generation";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { bind } from "../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";
import { GlyphProperty } from "../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the line rendering function.
 */
export interface LineConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  x1?: GlyphProperty<A, C, number>;
  x2?: GlyphProperty<A, C, number>;
  y1?: GlyphProperty<A, C, number>;
  y2?: GlyphProperty<A, C, number>;
}

/**
 * A class that manges the styling and positioning of a group of line glyphs.
 * @internal
 */
export class LineModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  x1: GlyphProperty<A, C, number>;
  x2: GlyphProperty<A, C, number>;
  y1: GlyphProperty<A, C, number>;
  y2: GlyphProperty<A, C, number>;

  public constructor(config: GlyphModifierConfig<A, C> & LineConfig<A, C>) {
    super(config);
    this.x1 = config.x1 || config.x || ((d) => d.c.xScale(d.a.start));
    this.x2 = config.x2 || ((d) => d.c.xScale(d.a.end));
    this.y1 =
      config.y1 || config.y || ((d) => (this.row(d) + 0.5) * d.c.rowHeight);
    this.y2 = config.y2 || this.y1;

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "y1", property: this.y1 },
      { key: "y2", property: this.y2 },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor || "black" },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "x1", property: this.x1 },
      { key: "x2", property: this.x2 },
    ]);
  }
}

/**
 * This renders a list of Annotation objects as lines in a Chart.
 * @param config
 */
export function line<A extends Annotation, C extends Chart<any>>(
  config: LineConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-line-glyph");

  let binding = bind<A, C, SVGLineElement>({
    ...config,
    selector,
    elementType: "line",
  });

  let modifier = new LineModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
