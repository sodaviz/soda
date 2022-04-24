import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { generateId } from "../../utilities/id-generation";
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
const linePlotScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();

function getDefaultLineFn<A extends PlotAnnotation, C extends Chart<any>>(
  modifier: LinePlotModifier<A, C>
) {
  return (d: AnnotationDatum<A, C>) => {
    let yScale = linePlotScaleMap.get(d.a.id);
    if (yScale == undefined) {
      console.error(
        `yScale not defined for annotation: ${d.a.id} in call to linePlot()`
      );
      return "";
    }
    let buffer = d3.path();
    let curve = d3.curveLinear(buffer);
    curve.lineStart();
    for (const [i, value] of d.a.values.entries()) {
      curve.point(
        d.c.xScale(d.a.start + i),
        resolveValue(modifier.row, d) * d.c.rowHeight + yScale(value)
      );
    }
    curve.lineEnd();
    return buffer.toString();
  };
}

/**
 * An interface that defines the parameters for instantiating a LinePlotModifier.
 * @internal
 */
export type LinePlotModifierConfig<
  A extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & LinePlotConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of line plot glyphs.
 * @internal
 */
export class LinePlotModifier<
  A extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  pathData?: GlyphProperty<A, C, string>;

  constructor(config: LinePlotModifierConfig<A, C>) {
    super(config);
    this.pathData = config.pathData || getDefaultLineFn(this);
    this.fillColor = config.fillColor || "none";
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
export interface LinePlotConfig<A extends PlotAnnotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * A callback that returns a string that defines the line's SVG path
   */
  pathData?: GlyphProperty<A, C, string>;
  /**
   * The number of bins that the plot will span. This defaults to 1, which forces the plot to fit into one row. If
   * an argument is supplied, it will cause the plot to grow downward. It will have no effect if a custom lineFunc
   * is supplied.
   */
  rowSpan?: number;
  initializeFn?: (this: LinePlotModifier<A, C>) => void;
  zoomFn?: (this: LinePlotModifier<A, C>) => void;
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
 * This renders PlotAnnotations as line plots in a Chart.
 * @param config
 */
export function linePlot<A extends PlotAnnotation, C extends Chart<any>>(
  config: LinePlotConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-line-plot-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "path",
  });

  let data = binding.g
    .selectAll<SVGPathElement, AnnotationDatum<A, C>>(
      `path.${internalSelector}`
    )
    .data();

  initializePlotGlyphYScales(linePlotScaleMap, {
    ...config,
    data,
  });

  let modifier = new LinePlotModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
