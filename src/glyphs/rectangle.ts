import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { generateId } from "../utilities/id-generation";
import { bind } from "../glyph-utilities/bind";
import { GlyphModifier } from "../glyph-utilities/glyph-modifier";

/**
 * An interface that defines the parameters for a call to the rectangle rendering function.
 */
export interface RectangleConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  // this doesn't have any implementation yet, but it might someday
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

  let modifier = new GlyphModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
