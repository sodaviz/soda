import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import { initializePlotGlyphYScales } from "../plots";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";

/**
 * @internal
 */
const barPlotScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();
/**
 * @internal
 */
export const defaultBarHeightFn = <A extends PlotAnnotation>(
  ann: A,
  value: number
) => {
  let yScale = barPlotScaleMap.get(ann.id);
  if (yScale == undefined) {
    console.error(
      `yScale not defined for annotation: ${ann.id} in call to barPlot()`
    );
    return 0;
  }
  return yScale(value);
};

/**
 * An interface that defines the parameters for instantiating a BarPlotModifier.
 * @internal
 */
export type BarPlotModifierConfig<
  A extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & BarPlotConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of bar plot glyphs.
 * @internal
 */
export class BarPlotModifier<
  A extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  barHeightFn: (ann: A, value: number) => number;

  constructor(config: BarPlotModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.barHeightFn = config.barHeightFn || defaultBarHeightFn;
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection
      .selectAll("rect")
      .data((d) => d.a.values)
      .enter()
      .append("rect")
      .attr("fill", "green");
    this.zoom();
  }

  defaultZoom() {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, number>("rect")
        .attr("x", d.c.xScale(d.a.start + i))
        .attr(
          "y",
          // (point) => d.c.rowHeight * (d.a.y + 1) - this.barHeightFn(d.a, point)
          (value) =>
            (resolveValue(this.row, d) + 1) * d.c.rowHeight -
            this.barHeightFn(d.a, value)
        )
        .attr("width", 5)
        .attr("height", (point) => this.barHeightFn(d.a, point));
    });
  }
}

/**
 * An interface that defines the parameters for a call to the barPlot rendering function.
 */
export interface BarPlotConfig<A extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  rowSpan?: number;
  barHeightFn?: (ann: A, value: number) => number;
  initializeFn?: (this: BarPlotModifier<A, C>) => void;
  zoomFn?: (this: BarPlotModifier<A, C>) => void;
  /**
   * This defines the domain of the plot.
   */
  domain?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the range of the plot.
   */
  range?: GlyphProperty<A, C, [number, number]>;
}

/**
 * This renders PlotAnnotations as bar plots in a Chart.
 * @param config.
 */
export function barPlot<A extends PlotAnnotation, C extends Chart<any>>(
  config: BarPlotConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-bar-plot-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "g",
  });

  let data = binding.g
    .selectAll<SVGGElement, AnnotationDatum<A, C>>(`g.${internalSelector}`)
    .data();

  initializePlotGlyphYScales(barPlotScaleMap, {
    ...config,
    data,
  });

  let modifier = new BarPlotModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
