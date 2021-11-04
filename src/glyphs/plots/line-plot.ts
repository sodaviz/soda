import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "../glyph-config";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../bind";
import { setYScales } from "../plots";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
} from "../glyph-modifier";

/**
 * @internal
 */
const linePlotScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();

/**
 * @internal
 */
export const defaultLineFn = <P extends PlotAnnotation, C extends Chart<any>>(
  d: AnnotationDatum<P, C>
) => {
  let yScale = linePlotScaleMap.get(d.a.id);
  if (yScale == undefined) {
    console.error("yScale not defined for", d.a, "in call to linePlot()");
    return "";
  }
  let buffer = d3.path();
  let curve = d3.curveLinear(buffer);
  curve.lineStart();
  for (const point of d.a.points) {
    curve.point(d.c.xScale(point[0]), d.c.rowHeight * d.a.y + yScale(point[1]));
  }
  curve.lineEnd();
  return buffer.toString();
};

/**
 * An interface that defines the parameters for instantiating a LinePlotModifier.
 * @internal
 */
export type LinePlotModifierConfig<
  P extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<P, C> & LinePlotConfig<P, C>;

/**
 * A class that manages the styling and positioning of a group of line plot glyphs.
 * @internal
 */
export class LinePlotModifier<
  P extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<P, C> {
  pathData?: GlyphProperty<P, C, string>;

  constructor(config: LinePlotModifierConfig<P, C>) {
    super(config);
    this.pathData = config.pathData || defaultLineFn;
    this.strokeColor = "black";
    this.fillColor = "none";
  }

  defaultZoom() {
    this.applyD();
  }

  applyD(): void {
    this.applyAttr("d", this.pathData);
  }
}

/**
 * An interface that defines the parameters for a call to the linePlot rendering function.
 */
export interface LinePlotConfig<P extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<P, C> {
  /**
   * A callback that returns a string that defines the line's SVG path
   */
  pathData?: GlyphProperty<P, C, string>;
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  binSpan?: number;
  initializeFn?: (this: LinePlotModifier<P, C>) => void;
  zoomFn?: (this: LinePlotModifier<P, C>) => void;
}

/**
 * This renders PlotAnnotations as line plots in a Chart.
 * @param config
 */
export function linePlot<P extends PlotAnnotation, C extends Chart<any>>(
  config: LinePlotConfig<P, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-line-plot-glyph");
  let internalSelector = selector + "-internal";

  setYScales(linePlotScaleMap, {
    chart: config.chart,
    annotations: config.annotations,
    binSpan: config.binSpan || 1,
    domainStart: (p: P) => p.minValue,
    rangeStart: (p: P, c: C) => c.rowHeight * (config.binSpan || 1),
    rangeEnd: () => 0,
  });

  let binding = bind<P, C, SVGPathElement>(selector, "path", config);

  let modifier = new LinePlotModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
