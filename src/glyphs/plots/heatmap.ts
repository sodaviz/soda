import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../glyph-config";
import { bind } from "../bind";
import { GlyphModifier, GlyphModifierConfig } from "../glyph-modifier";

/**
 * An interface that holds the parameters to style a bar plot.
 * @internal
 */
export interface HeatmapConfig<P extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<P, C> {
  /**
   *
   */
  initializeFn?: (this: HeatmapModifier<P, C>) => void;
  /**
   *
   */
  zoomFn?: (this: HeatmapModifier<P, C>) => void;
}

export type HeatmapModifierConfig<
  P extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<P, C> & HeatmapConfig<P, C>;

export class HeatmapModifier<
  P extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<P, C> {
  constructor(config: HeatmapModifierConfig<P, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
  }

  defaultInitialize() {
    super.defaultInitialize();
    let colorScale = d3.scaleSequential(d3.interpolatePRGn).domain([0, 100]);
    this.selection
      .selectAll("rect")
      .data((d) => d.a.points)
      .enter()
      .append("rect")
      .attr("fill", (p) => colorScale(p[1]));
    this.zoom();
  }

  defaultZoom() {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("x", (p) => this.chart.xScale(p[0]))
        .attr("y", () => this.chart.rowHeight * d.a.y)
        .attr(
          "width",
          () =>
            this.chart.xScale(d.a.points[1][0]) -
            this.chart.xScale(d.a.points[0][0])
        )
        .attr("height", () => this.chart.rowHeight);
    });
  }
}

/**
 * This renders PlotAnnotations as a heatmap.
 * @param chart The Chart in which we will render the plot.
 * @param ann The PlotAnnotations to be rendered.
 * @param config The parameters for configuring the styling of the plot.
 */
export function heatmap<P extends PlotAnnotation, C extends Chart<any>>(
  config: HeatmapConfig<P, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-heatmap-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<P, C, SVGRectElement>(selector, "g", config);

  let modifier = new HeatmapModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
