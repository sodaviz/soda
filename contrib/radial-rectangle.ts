import * as d3 from "d3";
import {
  Annotation,
  generateId,
  GlyphModifier,
  RectangleConfig,
  bind,
  GlyphModifierConfig,
  GlyphProperty,
} from "../src";
import { RadialChart } from "./radial-chart";
import { AnnotationDatum } from "../src/glyph-utilities/bind";

export const defaultRadialRectanglePathFn = <
  A extends Annotation,
  C extends RadialChart<any>
>(
  d: AnnotationDatum<A, C>
) => {
  return (
    d3
      .arc<any, AnnotationDatum<A, C>>()
      .innerRadius((d) => d.c.outerRadius - d.a.y * d.c.rowHeight)
      .outerRadius((d) => d.c.outerRadius - (d.a.y + 1) * d.c.rowHeight)
      .startAngle((d) => Math.max(d.c.xScale(d.a.start), 0))
      .endAngle((d) => Math.min(d.c.xScale(d.a.end), 2 * Math.PI))(d) || ""
  );
};

export const defaultRadialRectangleTransformFn = <
  A extends Annotation,
  C extends RadialChart<any>
>(
  d: AnnotationDatum<A, C>
) => `translate(${d.c.viewportWidth / 2}, ${d.c.viewportWidth / 2})`;

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
 * An interface that defines the parameters for instantiating a RadialRectangleModifier.
 * @internal
 */
export type RadialRectangleModifierConfig<
  A extends Annotation,
  C extends RadialChart<any>
> = GlyphModifierConfig<A, C> & RectangleConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of radial rectangle glyphs.
 * @internal
 */
export class RadialRectangleModifier<
  A extends Annotation,
  C extends RadialChart<any>
> extends GlyphModifier<A, C> {
  pathData: GlyphProperty<A, C, string>;
  transform: GlyphProperty<A, C, string>;
  visibility: GlyphProperty<A, C, string>;

  constructor(config: RadialRectangleModifierConfig<A, C>) {
    super(config);
    this.pathData = defaultRadialRectanglePathFn;
    this.transform = defaultRadialRectangleTransformFn;
    this.visibility = defaultRadialRectangleVisibilityFn;
  }

  defaultZoom() {
    this.applyD();
    this.applyTransform();
    this.applyVisibility();
  }

  applyD(): void {
    this.applyAttr("d", this.pathData);
  }

  applyTransform(): void {
    this.applyAttr("transform", this.transform);
  }

  applyVisibility(): void {
    this.applyAttr("visibility", this.visibility);
  }
}

/**
 * This renders a list of Annotation objects as rectangles in a RadialChart.
 * @param config
 */
export function radialRectangle<
  A extends Annotation,
  C extends RadialChart<any>
>(config: RectangleConfig<A, C>): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-radial-rect-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "path",
  });

  let modifier = new RadialRectangleModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
