import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisType, getAxis } from "../axes";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";

/**
 * An interface that defines the parameters for a call to the verticalAxis rendering function.
 */
export interface VerticalAxisConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  /**
   * This defines the domain of the axis.
   */
  domain?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the range of the axis.
   */
  range?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the tick property that will be passed to D3's axis.ticks function. For more information, see
   * https://github.com/d3/d3-axis#axis_ticks
   */
  ticks?: GlyphProperty<A, C, number>;
  /**
   * This defines the tick property that will be passed to D3's axis.tickSizeOuter function. For more information, see
   * https://github.com/d3/d3-axis#axis_tickSizeOuter
   */
  tickSizeOuter?: GlyphProperty<A, C, number>;
  /**
   * This determines whether the ticks and labels will be placed on the left or the right of the axis.
   */
  axisType?: AxisType.Left | AxisType.Right;
  /**
   * The number of bins that the axis will span. This defaults to 1, which forces the axis to fit into one row. If
   * an argument is supplied, it will cause the axis to grow downward. It will have no effect if a custom domain
   * function is supplied.
   */
  rowSpan?: number;
  initializeFn?: (this: VerticalAxisModifier<A, C>) => void;
  zoomFn?: (this: VerticalAxisModifier<A, C>) => void;
}

/**
 * An interface that defines the parameters for instantiating a VerticalAxisModifier.
 * @internal
 */
export type VerticalAxisModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & VerticalAxisConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of vertical axis glyphs.
 * @internal
 */
export class VerticalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  domain: GlyphProperty<A, C, [number, number]>;
  range: GlyphProperty<A, C, [number, number]>;
  rowSpan: number;
  ticks: GlyphProperty<A, C, number>;
  tickSizeOuter: GlyphProperty<A, C, number>;
  axisType: AxisType.Left | AxisType.Right;

  constructor(config: VerticalAxisModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.domain = config.domain || [0, 1];
    this.rowSpan = config.rowSpan || 1;
    this.range =
      config.range ||
      ((d: AnnotationDatum<A, C>) => [0, d.c.rowHeight * this.rowSpan - 4]);
    this.ticks = config.ticks || 5;
    this.tickSizeOuter = config.tickSizeOuter || 6;
    this.axisType = config.axisType || AxisType.Left;
  }

  defaultZoom(): void {
    this.selection
      .attr(
        "transform",
        (d) =>
          `translate(${resolveValue(this.x, d)}, ${resolveValue(this.y, d)})`
      )
      .each((d, i, nodes) => {
        let domain = resolveValue(this.domain, d);
        let yScale = d3
          .scaleLinear()
          .domain([domain[1], domain[0]])
          .range(resolveValue(this.range, d));

        let axis = getAxis(yScale, this.axisType);

        axis
          .ticks(resolveValue(this.ticks, d))
          .tickSizeOuter(resolveValue(this.ticks, d));

        d3.select(nodes[i]).call(axis);
      });
  }
}

/**
 * This renders Annotations as vertical axes in a chart. This is intended to be used in conjunction with one of the
 * plotting glyph modules.
 * @param config The parameters for configuring the styling of the axes.
 */
export function verticalAxis<A extends Annotation, C extends Chart<any>>(
  config: VerticalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-vertical-axis-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  let modifier = new VerticalAxisModifier({
    selector,
    selection: binding.merge,
    ...config,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
