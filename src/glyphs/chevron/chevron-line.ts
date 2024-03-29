import { Chart } from "../../charts/chart";
import { generateId } from "../../utilities/id-generation";
import { Annotation } from "../../annotations/annotation";
import { bind } from "../../glyph-utilities/bind";
import * as d3 from "d3";
import { LineConfig, LineModifier } from "../line";
import { ChevronPatternModifier } from "./chevron-pattern";
import { ChevronGlyphConfig } from "../chevron";
import { RectangleModifier } from "../rectangle";

/**
 * An interface that defines the parameters for a call to the chevronLine rendering function.
 */
export interface ChevronLineConfig<A extends Annotation, C extends Chart<any>>
  extends ChevronGlyphConfig<A, C>,
    LineConfig<A, C> {}

/**
 * This renders Annotations as lines with chevron arrows in a Chart.
 * @param config
 */
export function chevronLine<A extends Annotation, C extends Chart<any>>(
  config: ChevronLineConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-chevron-line-glyph");
  let patternSelector = selector + "-pattern";
  let rectSelector = selector + "-rect";
  let lineSelector = selector + "-line";

  let outerBinding = bind<A, C, SVGPatternElement>({
    ...config,
    annotations: [],
    selector,
    elementType: "g",
  });

  let patternBinding = bind<A, C, SVGPatternElement>({
    ...config,
    selector,
    elementType: "pattern",
    target: outerBinding.g,
  });

  let rectBinding = bind<A, C, SVGRectElement>({
    ...config,
    selector,
    elementType: "rect",
    target: outerBinding.g,
  });

  let lineBinding = bind<A, C, SVGLineElement>({
    ...config,
    selector,
    elementType: "line",
    target: outerBinding.g,
  });

  let patternModifier = new ChevronPatternModifier({
    ...config,
    selector: patternSelector,
    selection: patternBinding.merge,
  });

  let rectModifier = new RectangleModifier({
    ...config,
    selector: rectSelector,
    selection: rectBinding.merge,
    fillColor: (d) => `url(#${d.a.id})`,
    strokeColor: "none",
  });

  let lineModifier = new LineModifier({
    ...config,
    selector: lineSelector,
    selection: lineBinding.merge,
  });

  config.chart.addGlyphModifier(patternModifier);
  config.chart.addGlyphModifier(rectModifier);
  config.chart.addGlyphModifier(lineModifier);

  return outerBinding.g;
}
