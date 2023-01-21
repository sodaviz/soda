import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { generateId } from "../../utilities/id-generation";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { bind } from "../../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../../glyph-utilities/glyph-modifier";
import {
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the heatmap rendering function.
 * @internal
 */
export interface HeatmapConfig<A extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
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
  domain?: GlyphProperty<A, C, [number, number]>;
}

/**
 * A class that manages the styling and positioning of a group of heatmap glyphs.
 * @internal
 */
export class HeatmapModifier<
  A extends PlotAnnotation,
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
  domain: GlyphCallback<A, C, [number, number]>;

  constructor(config: GlyphModifierConfig<A, C> & HeatmapConfig<A, C>) {
    super(config);
    this.colorScheme = config.colorScheme || d3.interpolateViridis;
    this.domain = callbackifyOrDefault(config.domain, () => [0, 1]);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "transform", property: (d) => `translate(0, ${this.y(d)})` },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor || "none" },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor || "black" },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);
  }

  initialize() {
    this.selection.each((d, i, nodes) => {
      let tmpColorScale = d3
        .scaleSequential(this.colorScheme)
        .domain(this.domain(d));

      d3.select(nodes[i])
        .selectAll<SVGRectElement, number>("rect")
        .data(Array.from(d.a.values.entries()))
        .enter()
        .append("rect")
        .attr("fill", (v) => tmpColorScale(v[1]));
    });
    super.initialize();
  }

  zoom() {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("x", (v) => this.chart.xScale(d.a.start + v[0]))
        .attr("width", () => this.chart.xScale(1) - this.chart.xScale(0))
        .attr("height", this.height(d));
    });
  }
}

/**
 * This renders PlotAnnotations as heatmaps in a Chart.
 * @param config
 */
export function heatmap<A extends PlotAnnotation, C extends Chart<any>>(
  config: HeatmapConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-heatmap-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  if (config.outlineColor || config.backgroundColor) {
    let rectSelector = selector + "-background";
    let rectBinding = bind<A, C, SVGRectElement>({
      ...config,
      selector: rectSelector,
      target: binding.g,
      elementType: "rect",
    });

    let rectModifier = new GlyphModifier({
      ...config,
      strokeColor: config.outlineColor || "none",
      fillColor: config.backgroundColor || "none",
      selector: rectSelector,
      selection: rectBinding.merge,
    });

    config.chart.addGlyphModifier(rectModifier);
  }

  let modifier = new HeatmapModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
