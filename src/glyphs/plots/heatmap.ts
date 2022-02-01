import { ContinuousAnnotation } from "../../annotations/continuous-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { bind } from "../../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";

/**
 * An interface that defines the parameters for a call to the heatmap rendering function.
 * @internal
 */
export interface HeatmapConfig<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> extends GlyphConfig<A, C> {
  initializeFn?: (this: HeatmapModifier<A, C>) => void;
  zoomFn?: (this: HeatmapModifier<A, C>) => void;
  /**
   * The color of the outline around the entire heatmap glyph.
   */
  outlineColor?: GlyphProperty<A, C, string>;
  /**
   * The color of the background of the entire heatmap glyph.
   */
  backgroundColor?: GlyphProperty<A, C, string>;
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
  A extends ContinuousAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & HeatmapConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of heatmap glyphs.
 * @internal
 */
export class HeatmapModifier<
  A extends ContinuousAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
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

  constructor(config: HeatmapModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.colorScheme = config.colorScheme || d3.interpolatePRGn;
    this.domain = config.domain || [0, 1];
    this.colorScale = d3.scaleSequential(this.colorScheme).domain(this.domain);
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection.selectAll("rect").remove();
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
        .attr("y", resolveValue(this.y, d))
        .attr(
          "width",
          () => this.chart.xScale(d.a.pointWidth) - this.chart.xScale(0)
        )
        .attr("height", resolveValue(this.height, d));
    });
  }
}

/**
 * This renders PlotAnnotations as heatmaps in a Chart.
 * @param config
 */
export function heatmap<A extends ContinuousAnnotation, C extends Chart<any>>(
  config: HeatmapConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-heatmap-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "g",
  });

  if (config.outlineColor || config.backgroundColor) {
    let rectSelector = selector + "-background";
    let internalRectSelector = rectSelector + "-internal";
    let rectBinding = bind<A, C, SVGRectElement>({
      ...config,
      selector: rectSelector,
      internalSelector: internalRectSelector,
      target: binding.g,
      elementType: "rect",
    });

    let rectModifier = new GlyphModifier({
      ...config,
      strokeColor: config.outlineColor || "none",
      fillColor: config.backgroundColor || "none",
      selector: internalRectSelector,
      selection: rectBinding.merge,
    });

    config.chart.addGlyphModifier(rectModifier);
  }

  let modifier = new HeatmapModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
