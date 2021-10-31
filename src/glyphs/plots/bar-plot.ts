import { PlotAnnotation } from "../../annotations/plot-annotation";
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
export const defaultBarHeightFn = <P extends PlotAnnotation>(
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

export function defaultBarPlotModifierInitialize<
  P extends PlotAnnotation,
  C extends Chart<any>
>(this: BarPlotModifier<P, C>) {
  this.setId();
  this.selection
    .selectAll("rect")
    .data((d) => d.a.points)
    .enter()
    .append("rect")
    .attr("fill", "green");
  this.zoom();
}

export function defaultBarPlotModifierZoom<
  P extends PlotAnnotation,
  C extends Chart<any>
>(this: BarPlotModifier<P, C>) {
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

export type BarPlotModifierConfig<
  P extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<P, C> & BarPlotConfig<P, C>;

export class BarPlotModifier<
  P extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<P, C> {
  barHeightFn: (ann: P, point: [number, number]) => number;

  constructor(config: BarPlotModifierConfig<P, C>) {
    super(config);
    this.barHeightFn = config.barHeightFn || defaultBarHeightFn;

    this.initializeFn = config.initializeFn || defaultBarPlotModifierInitialize;
    this.zoomFn = config.zoomFn || defaultBarPlotModifierZoom;
  }
}

/**
 * An interface that holds the parameters to style a bar plot.
 */
export interface BarPlotConfig<P extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<P, C> {
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  binSpan?: number;
  barHeightFn?: (ann: P, point: [number, number]) => number;
  /**
   *
   */
  initializeFn?: (this: BarPlotModifier<P, C>) => void;
  /**
   *
   */
  zoomFn?: (this: BarPlotModifier<P, C>) => void;
}

/**
 * This renders PlotAnnotations as a bar plot.
 * @param chart The Chart in which we will render the plot.
 * @param ann The PlotAnnotations to be rendered.
 * @param config The parameters for configuring the styling of the plot.
 */
export function barPlot<P extends PlotAnnotation, C extends Chart<any>>(
  config: BarPlotConfig<P, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-bar-plot-glyph");
  let internalSelector = selector + "-internal";

  setYScales(barPlotScaleMap, config);

  let binding = bind<P, C, SVGGElement>(selector, "g", config);

  let modifier = new BarPlotModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
