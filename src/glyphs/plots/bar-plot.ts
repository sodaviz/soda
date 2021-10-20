import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../glyph-config";
import { AnnotationDatum, bind } from "../bind";
import { setYScales } from "../plots";
import { GlyphModifier } from "../glyph-modifier";

/**
 * @internal
 */
const barPlotScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();
/**
 * @internal
 */
export const defaultBarHeightFn = <P extends PlotAnnotation = PlotAnnotation>(
  ann: P,
  point: [number, number]
) => {
  let yScale = barPlotScaleMap.get(ann.id);
  if (yScale == undefined) {
    console.error("yScale not defined for", ann, "in call to barPlot()");
    return 0;
  }
  return yScale(point[1]);
};

export class BarPlotModifier<
  P extends PlotAnnotation = PlotAnnotation,
  C extends Chart<any> = Chart
> extends GlyphModifier<P, C> {
  barHeightFn: (ann: P, point: [number, number]) => number;

  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<P, C>, any, any>,
    config: BarPlotConfig<P, C>
  ) {
    super(selector, selection, config);
    this.barHeightFn = config.barHeightFn || defaultBarHeightFn;
  }

  initialize(): void {
    this.setId();
    this.selection
      .selectAll("rect")
      .data((d) => d.a.points)
      .enter()
      .append("rect")
      .attr("fill", "green");
    this.zoom();
  }

  zoom(): void {
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
 * An interface that holds the parameters to style a bar plot.
 */
export interface BarPlotConfig<
  P extends PlotAnnotation = PlotAnnotation,
  C extends Chart<any> = Chart
> extends GlyphConfig<P, C> {
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  binSpan?: number;
  barHeightFn?: (ann: P, point: [number, number]) => number;
}

/**
 * This renders PlotAnnotations as a bar plot.
 * @param chart The Chart in which we will render the plot.
 * @param ann The PlotAnnotations to be rendered.
 * @param config The parameters for configuring the styling of the plot.
 */
export function barPlot<
  P extends PlotAnnotation = PlotAnnotation,
  C extends Chart<any> = Chart
>(config: BarPlotConfig<P, C>): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-bar-plot-glyph");
  let internalSelector = selector + "-internal";

  setYScales(barPlotScaleMap, config);

  let binding = bind<P, C, SVGGElement>(selector, "g", config);

  let modifier = new BarPlotModifier(internalSelector, binding.merge, config);
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
