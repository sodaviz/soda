import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../glyph-config";
import { bind } from "../bind";
import { GlyphModifier, GlyphModifierConfig } from "../glyph-modifier";

/**
 * An interface that defines the parameters for a call to the heatmap rendering function.
 * @internal
 */
export interface HeatmapConfig<P extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<P, C> {
  initializeFn?: (this: HeatmapModifier<P, C>) => void;
  zoomFn?: (this: HeatmapModifier<P, C>) => void;
  /**
   * The function that will be used to define the output of the color scale used for the heatmap. See
   * https://github.com/d3/d3-scale-chromatic for more information.
   */
  colorScheme?: (t: number) => string;
  /**
   * The domain of the heatmap color scale. This defaults to [0, 1].
   */
  domain?: [number, number];
}

/**
 * An interface that defines the parameters for instantiating a HeatmapModifier.
 * @internal
 */
export type HeatmapModifierConfig<
  P extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<P, C> & HeatmapConfig<P, C>;

/**
 * A class that manages the styling and positioning of a group of heatmap glyphs.
 * @internal
 */
export class HeatmapModifier<
  P extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<P, C> {
  /**
   * The function that will be used to define the output of the color scale used for the heatmap. See
   * https://github.com/d3/d3-scale-chromatic for more information.
   */
  colorScheme: (t: number) => string;
  /**
   * The domain of the heatmap color scale. This defaults to [0, 1].
   */
  domain: [number, number];
  colorScale: d3.ScaleSequential<string>;

  constructor(config: HeatmapModifierConfig<P, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.colorScheme = config.colorScheme || d3.interpolatePRGn;
    this.domain = config.domain || [0, 1];
    this.colorScale = d3.scaleSequential(this.colorScheme).domain(this.domain);
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection
      .selectAll("rect")
      .data((d) => d.a.points)
      .enter()
      .append("rect")
      .attr("fill", (p) => this.colorScale(p[1]));
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
 * This renders PlotAnnotations as heatmaps in a Chart.
 * @param config
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
