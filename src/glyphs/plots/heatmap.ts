import { PlotAnnotation } from "../../annotations/plot-annotation";
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
export interface HeatmapConfig<A extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
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
  domain?: GlyphProperty<A, C, [number, number]>;
}

/**
 * An interface that defines the parameters for instantiating a HeatmapModifier.
 * @internal
 */
export type HeatmapModifierConfig<
  A extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & HeatmapConfig<A, C>;

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
  domain: GlyphProperty<A, C, [number, number]>;

  constructor(config: HeatmapModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.colorScheme = config.colorScheme || d3.interpolateViridis;
    this.domain = config.domain || [0, 1];
  }

  defaultInitialize() {
    super.defaultInitialize();
    this.selection.selectAll("rect").remove();

    this.selection.each((d, i, nodes) => {
      let tmpColorScale = d3
        .scaleSequential(this.colorScheme)
        .domain(resolveValue(this.domain, d));

      d3.select(nodes[i])
        .selectAll<SVGRectElement, number>("rect")
        .data(Array.from(d.a.values.entries()))
        .enter()
        .append("rect")
        .attr("fill", (v) => tmpColorScale(v[1]));
    });

    this.zoom();
  }

  defaultZoom() {
    this.applyY();
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("x", (v) => this.chart.xScale(d.a.start + v[0]))
        .attr("width", () => this.chart.xScale(1) - this.chart.xScale(0))
        .attr("height", resolveValue(this.height, d));
    });
  }

  applyY() {
    this.applyAttr(
      "transform",
      (d) => `translate(0, ${resolveValue(this.y, d)})`
    );
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
