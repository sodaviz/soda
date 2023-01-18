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
import { GlyphProperty } from "../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the rectangle rendering function.
 */
export interface RectangleConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * This controls the y-axis radius of the rectangle.
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx
   */
  rx?: GlyphProperty<A, C, number>;
  /**
   * This controls the x-axis radius of the rectangle.
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/ry
   */
  ry?: GlyphProperty<A, C, number>;
}

export class RectangleModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  constructor(config: GlyphModifierConfig<A, C> & RectangleConfig<A, C>) {
    super(config);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "y", property: this.y },
      { key: "height", property: this.height },
      { key: "rx", property: config.rx },
      { key: "ry", property: config.ry },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "x", property: this.x },
      { key: "width", property: this.width },
    ]);
  }
}

/**
 * This renders a list of Annotation objects as rectangles in a Chart.
 * @param config
 */
export function rectangle<A extends Annotation, C extends Chart<any>>(
  config: RectangleConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-rect-glyph");

  let binding = bind<A, C, SVGRectElement>({
    ...config,
    selector,
    elementType: "rect",
  });

  let modifier = new RectangleModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
