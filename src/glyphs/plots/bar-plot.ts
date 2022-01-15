import { ContinuousAnnotation } from "../../annotations/continuous-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../glyph-config";
import { bind } from "../bind";
import { setYScales } from "../plots";
import { GlyphModifier, GlyphModifierConfig } from "../glyph-modifier";

/**
 * @internal
 */
const barPlotScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();
/**
 * @internal
 */
export const defaultBarHeightFn = <A extends ContinuousAnnotation>(
  ann: A,
  point: [number, number]
) => {
  let yScale = barPlotScaleMap.get(ann.id);
  if (yScale == undefined) {
    console.error("yScale not defined for", ann, "in call to barPlot()");
    return 0;
  }
  return yScale(point[1]);
};

/**
 * An interface that defines the parameters for instantiating a BarPlotModifier.
 * @internal
 */
export type BarPlotModifierConfig<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & BarPlotConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of bar plot glyphs.
 * @internal
 */
export class BarPlotModifier<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  barHeightFn: (ann: A, point: [number, number]) => number;

  constructor(config: BarPlotModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.barHeightFn = config.barHeightFn || defaultBarHeightFn;
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection
      .selectAll("rect")
      .data((d) => d.a.points)
      .enter()
      .append("rect")
      .attr("fill", "green");
    this.zoom();
  }

  defaultZoom() {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("x", (point) => d.c.xScale(point[0]))
        .attr(
          "y",
          (point) => d.c.rowHeight * (d.a.y + 1) - this.barHeightFn(d.a, point)
        )
        .attr("width", 5)
        .attr("height", (point) => this.barHeightFn(d.a, point));
    });
  }
}

/**
 * An interface that defines the parameters for a call to the barPlot rendering function.
 */
export interface BarPlotConfig<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> extends GlyphConfig<A, C> {
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  binSpan?: number;
  barHeightFn?: (ann: A, point: [number, number]) => number;
  initializeFn?: (this: BarPlotModifier<A, C>) => void;
  zoomFn?: (this: BarPlotModifier<A, C>) => void;
}

/**
 * This renders PlotAnnotations as bar plots in a Chart.
 * @param config.
 */
export function barPlot<A extends ContinuousAnnotation, C extends Chart<any>>(
  config: BarPlotConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-bar-plot-glyph");
  let internalSelector = selector + "-internal";

  setYScales(barPlotScaleMap, config);

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "g",
  });

  let modifier = new BarPlotModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
