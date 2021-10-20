import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisType, getAxis } from "../axes";
import { GlyphConfig } from "../glyph-config";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../bind";
import { GlyphModifier, GlyphProperty, resolveValue } from "../glyph-modifier";

/**
 * An interface that holds the parameters to style a vertical axis.
 */
export interface VerticalAxisConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  domain?: GlyphProperty<A, C, [number, number]>;
  range?: GlyphProperty<A, C, [number, number]>;
  ticks?: GlyphProperty<A, C, number>;
  tickSizeOuter?: GlyphProperty<A, C, number>;
  axisType?: AxisType.Left | AxisType.Right;
  fixed?: boolean;
  /**
   * The number of bins that the axis will span. This defaults to 1, which forces the axis to fit into one row. If
   * an argument is supplied, it will cause the axis to grow downward. It will have no effect if a custom domain
   * function is supplied.
   */
  binSpan?: number;
}

export class VerticalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  domain: GlyphProperty<A, C, [number, number]>;
  range: GlyphProperty<A, C, [number, number]>;
  binSpan: number;
  ticks: GlyphProperty<A, C, number>;
  tickSizeOuter: GlyphProperty<A, C, number>;
  axisType: AxisType.Left | AxisType.Right;
  fixed: boolean;

  constructor(
    selector: string,
    selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>,
    config: VerticalAxisConfig<A, C>
  ) {
    super(selector, selection, config);
    this.domain = config.domain || [0, 100];
    this.binSpan = config.binSpan || 1;
    this.range = config.range || [0, config.chart.rowHeight * this.binSpan];
    this.ticks = config.ticks || 5;
    this.tickSizeOuter = config.tickSizeOuter || 6;
    this.axisType = config.axisType || AxisType.Right;
    this.fixed = config.fixed || false;
  }

  initialize(): void {
    this.setId();
    this.renderAxis();
  }

  renderAxis(): void {
    this.selection
      .attr(
        "transform",
        (d) =>
          `translate(${resolveValue(this.x, d)}, ${resolveValue(this.y, d)})`
      )
      .each((d, i, nodes) => {
        let yScale = d3
          .scaleLinear()
          .domain(resolveValue(this.domain, d))
          .range(resolveValue(this.range, d));

        let axis = getAxis(yScale, this.axisType);

        axis
          .ticks(resolveValue(this.ticks, d))
          .tickSizeOuter(resolveValue(this.ticks, d));

        d3.select(nodes[i]).call(axis);
      });
  }

  zoom(): void {
    if (!this.fixed) {
      this.renderAxis();
    }
  }
}

/**
 * This renders Annotations as vertical axes in a chart. This is intended to be used in conjunction with one of the
 * plotting glyph modules. The vertical axes can be fixed in place, but they are configured to move during zoom
 * events by default.
 * @param chart The Chart in which we will render the axes.
 * @param ann The Annotations to be rendered.
 * @param config The parameters for configuring the styling of the axes.
 */
export function verticalAxis<A extends Annotation, C extends Chart<any>>(
  config: VerticalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-vertical-axis-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGGElement>(selector, "g", config);

  let modifier = new VerticalAxisModifier(
    internalSelector,
    binding.merge,
    config
  );
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
