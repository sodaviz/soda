import * as d3 from "d3";
import {
  Annotation,
  generateId,
  GlyphModifier,
  RectangleConfig,
  bind,
  GlyphModifierConfig,
  GlyphProperty,
} from "../../index";
import { RadialChart } from "../../charts/radial-chart";
import { AnnotationDatum } from "../../glyph-utilities/bind";

/**
 * @internal
 */
export function getDefaultRadialRectanglePathFn<
  A extends Annotation,
  C extends RadialChart<any>
>(modifier: RadialRectangleModifier<A, C>): GlyphProperty<A, C, string> {
  return (d: AnnotationDatum<A, C>) =>
    d3
      .arc<any, AnnotationDatum<A, C>>()
      .innerRadius((d) => d.c.outerRadius - modifier.y(d))
      .outerRadius(
        (d) => d.c.outerRadius - (modifier.y(d) + modifier.height(d))
      )
      // we enforce that the "rectangle" can't be drawn outside of the Chart's range
      .startAngle((d) => Math.max(d.c.xScale(d.a.start), d.c.range[0]))
      .endAngle((d) => Math.min(d.c.xScale(d.a.end), d.c.range[1]))(d) || "";
}

/**
 * @internal
 * @param d
 */
export const defaultRadialRectangleTransformFn = <
  A extends Annotation,
  C extends RadialChart<any>
>(
  d: AnnotationDatum<A, C>
) => `translate(${d.c.viewportWidthPx / 2}, ${d.c.viewportWidthPx / 2})`;

/**
 * @internal
 * @param d
 */
export const defaultRadialRectangleVisibilityFn = <
  A extends Annotation,
  C extends RadialChart<any>
>(
  d: AnnotationDatum<A, C>
) => {
  let domain = d.c.xScale.domain();
  if (d.a.start < domain[1] && d.a.end > domain[0]) {
    return "visible";
  } else {
    return "hidden";
  }
};

/**
 * An interface that defines the parameters for a call to the radialRectangle rendering function.
 */
export interface RadialRectangleConfig<
  A extends Annotation,
  C extends RadialChart<any>
> extends Omit<RectangleConfig<A, C>, "rx" | "ry"> {}

/**
 * A class that manages the styling and positioning of a group of radial rectangle glyphs.
 * @internal
 */
export class RadialRectangleModifier<
  A extends Annotation,
  C extends RadialChart<any>
> extends GlyphModifier<A, C> {
  constructor(config: GlyphModifierConfig<A, C> & RadialRectangleConfig<A, C>) {
    super(config);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
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

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "transform", property: defaultRadialRectangleTransformFn },
      { key: "d", property: getDefaultRadialRectanglePathFn(this) },
      { key: "visibility", property: defaultRadialRectangleVisibilityFn },
    ]);
  }
}

/**
 * This renders a list of Annotation objects as rectangles in a RadialChart.
 * @param config
 */
export function radialRectangle<
  A extends Annotation,
  C extends RadialChart<any>
>(
  config: RadialRectangleConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-radial-rect-glyph");

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    elementType: "path",
  });

  let modifier = new RadialRectangleModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
