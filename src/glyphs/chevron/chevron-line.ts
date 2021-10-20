import { Chart } from "../../charts/chart";
import { generateId } from "../../utilities/id-generation";
import { Annotation } from "../../annotations/annotation";
import { bind } from "../bind";
import { GlyphModifier } from "../glyph-modifier";
import * as d3 from "d3";
import { LineModifier } from "../line";
import { ChevronPatternModifier } from "./chevron-pattern";
import { ChevronGlyphConfig } from "../chevron";

/**
 * An interface that holds the parameters for rendering and configuring a chevron line glyph.
 */
export interface ChevronLineConfig<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
> extends ChevronGlyphConfig<A, C> {}

export function chevronLine<
  A extends Annotation = Annotation,
  C extends Chart<any> = Chart
>(
  config: ChevronLineConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-chevron-line-glyph");
  let patternSelector = selector + "-pattern";
  let rectangleSelector = selector + "-rect";
  let lineSelector = selector + "-line";

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

  let rectBinding = bind<A, C, SVGRectElement>(rectangleSelector, "rect", {
    ...config,
    bindTarget: outerBinding.g,
  });

  let lineBinding = bind<A, C, SVGLineElement>(lineSelector, "line", {
    ...config,
    bindTarget: outerBinding.g,
  });

  let patternModifier = new ChevronPatternModifier(
    patternSelector,
    patternBinding.merge,
    {
      ...config,
      selector: patternSelector,
    }
  );

  let rectModifier = new GlyphModifier(rectangleSelector, rectBinding.merge, {
    ...config,
    selector: rectangleSelector,
    fillColor: (d) => `url(#${d.a.id})`,
  });

  let lineModifier = new LineModifier(lineSelector, lineBinding.merge, {
    ...config,
    selector: lineSelector,
  });

  config.chart.addGlyphModifier(patternModifier);
  config.chart.addGlyphModifier(rectModifier);
  config.chart.addGlyphModifier(lineModifier);

  return outerBinding.g;
}
