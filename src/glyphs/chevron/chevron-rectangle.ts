import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { generateId } from "../../utilities/id-generation";
import { RectangleConfig } from "../rectangle";
import { Annotation } from "../../annotations/annotation";
import { bind } from "../bind";
import { GlyphModifier } from "../glyph-modifier";
import { ChevronPatternModifier } from "./chevron-pattern";
import { ChevronGlyphConfig } from "../chevron";

/**
 * An interface that defines the parameters for a call to the chevronRectangle rendering function.
 */
export interface ChevronRectangleConfig<
  A extends Annotation,
  C extends Chart<any>
> extends ChevronGlyphConfig<A, C>,
    RectangleConfig<A, C> {}

/**
 * This renders Annotations as rectangles with chevron arrows in a Chart.
 * @param config
 */
export function chevronRectangle<A extends Annotation, C extends Chart<any>>(
  config: ChevronRectangleConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-chevron-rect-glyph");
  let patternSelector = selector + "-pattern";
  let rectSelector = selector + "-rect";

  let outerBinding = bind<A, C, SVGPatternElement>(selector, "pattern", {
    ...config,
    annotations: [],
  });

  let patternBinding = bind<A, C, SVGPatternElement>(
    patternSelector,
    "pattern",
    {
      ...config,
      bindTarget: outerBinding.g,
    }
  );

  let rectBinding = bind<A, C, SVGRectElement>(rectSelector, "rect", {
    ...config,
    bindTarget: outerBinding.g,
  });

  let patternModifier = new ChevronPatternModifier({
    ...config,
    selector: patternSelector,
    selection: patternBinding.merge,
  });

  let rectModifier = new GlyphModifier({
    ...config,
    selector: rectSelector,
    selection: rectBinding.merge,
    fillColor: (d) => `url(#${d.a.id})`,
    strokeColor: config.strokeColor || "black",
  });

  patternModifier.initialize();
  rectModifier.initialize();
  config.chart.glyphModifiers.push(patternModifier);
  config.chart.glyphModifiers.push(rectModifier);

  return outerBinding.g;
}
