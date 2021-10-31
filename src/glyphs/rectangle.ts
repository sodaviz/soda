import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "./glyph-config";
import { generateId } from "../utilities/id-generation";
import { bind } from "./bind";
import { GlyphModifier } from "./glyph-modifier";

/**
 * An interface that holds the parameters for rendering rectangle glyphs.
 */
export interface RectangleConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  // /**
  //  *
  //  */
  // initializeFn?: (this: RectangleModifier<A, C>) => void;
  // /**
  //  *
  //  */
  // zoomFn?: (this: RectangleModifier<A, C>) => void;
}

/**
 * This renders a list of Annotation objects in a target chart as rectangles.
 * @param chart The target Chart.
 * @param ann The list of Annotation objects to be rendered.
 * @param config The parameters for configuring the style of the lines.
 */
export function rectangle<A extends Annotation, C extends Chart<any>>(
  config: RectangleConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-rect-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGRectElement>(selector, "rect", config);

  let modifier = new GlyphModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
