import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { generateId } from "../../utilities/id-generation";
import { RectangleConfig, RectangleModifier } from "../rectangle";
import { Annotation } from "../../annotations/annotation";
import { bind } from "../../glyph-utilities/bind";
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
  let patternSelectorInternal = patternSelector + "-internal";
  let rectSelector = selector + "-rect";
  let rectSelectorInternal = rectSelector + "-internal";

  let outerBinding = bind<A, C, SVGPatternElement>({
    ...config,
    annotations: [],
    selector,
    elementType: "g",
  });

  let patternBinding = bind<A, C, SVGPatternElement>({
    ...config,
    selector: patternSelector,
    elementType: "pattern",
    target: outerBinding.g,
  });

  let rectBinding = bind<A, C, SVGRectElement>({
    ...config,
    selector: rectSelector,
    elementType: "rect",
    target: outerBinding.g,
  });

  let patternModifier = new ChevronPatternModifier({
    ...config,
    selector: patternSelectorInternal,
    selection: patternBinding.merge,
  });

  let rectModifier = new RectangleModifier({
    ...config,
    selector: rectSelectorInternal,
    selection: rectBinding.merge,
    fillColor: (d) => `url(#${d.a.id})`,
    strokeColor: config.strokeColor || "black",
  });

  config.chart.addGlyphModifier(patternModifier);
  config.chart.addGlyphModifier(rectModifier);

  return outerBinding.g;
}
