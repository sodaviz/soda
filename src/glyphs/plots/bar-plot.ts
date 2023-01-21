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
} from "../../glyph-utilities/glyph-modifier";
import {
  callbackifyOrDefault,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";

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
 * A class that manages the styling and positioning of a group of bar plot glyphs.
 * @internal
 */
export class BarPlotModifier<
  A extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  barHeightFn: (ann: A, value: number) => number;

  constructor(config: GlyphModifierConfig<A, C> & BarPlotConfig<A, C>) {
    super(config);
    this.y = callbackifyOrDefault(
      config.y,
      (d: AnnotationDatum<A, C>) => this.row(d) * d.c.rowHeight - 2
    );

    this.barHeightFn = defaultBarHeightFn;

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "transform", property: (d) => `translate(0, ${this.y(d)})` },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);
  }

  initialize() {
    // I'm not seeing a good reason to save a reference to this selection
    // because of the weird way that we need to use it (see zoom())
    // TODO: this could probably be simplified
    this.selection
      .selectAll("rect")
      .data((d) => Array.from(d.a.values.entries()))
      .enter()
      .append("rect");

    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("y", (v) => d.c.rowHeight - this.barHeightFn(d.a, v[1]))
        .attr("height", (v) => this.barHeightFn(d.a, v[1]));
    });
    super.initialize();
  }

  zoom() {
    // for every bar, we need both the AnnotationDatum and the values for x positioning
    // since the property application system expects an AnnotationDatum to be bound,
    // it wouldn't work here without some hacking
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll<SVGRectElement, [number, number]>("rect")
        .attr("x", (v) => d.c.xScale(d.a.start + v[0]))
        .attr("width", () => this.chart.xScale(1) - this.chart.xScale(0));
    });
  }
}

/**
 * This renders PlotAnnotations as bar plots in a Chart.
 * @param config.
 */
export function barPlot<A extends PlotAnnotation, C extends Chart<any>>(
  config: BarPlotConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-bar-plot-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  let data = binding.g
    .selectAll<SVGGElement, AnnotationDatum<A, C>>(`g.${selector}`)
    .data();

  initializePlotGlyphYScales(barPlotScaleMap, {
    ...config,
    data,
  });

  let modifier = new BarPlotModifier({
    ...config,
    selector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
