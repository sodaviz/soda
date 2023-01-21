import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import * as d3 from "d3";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../../glyph-utilities/glyph-modifier";
import { LinePlotConfig } from "./line-plot";
import { generateId } from "../../utilities/id-generation";
import { initializePlotGlyphYScales } from "../plots";
import {
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
  resolveGlyphProperty,
} from "../../glyph-utilities/glyph-property";

/**
 * A simple enum to define the direction that an area glyph fills in.
 */
export enum FillDirection {
  Up = "up",
  Down = "down",
}

const areaScaleMap: Map<string, d3.ScaleLinear<number, number>> = new Map();

/**
 * @internal
 * @param modifier
 */
function getDefaultAreaFn<A extends PlotAnnotation, C extends Chart<any>>(
  modifier: AreaModifier<A, C>
) {
  return (d: AnnotationDatum<A, C>) => {
    let yScale = areaScaleMap.get(d.a.id);
    if (yScale == undefined) {
      console.error("yScale not defined for", d.a, "in call to area()");
      return "";
    }
    let buffer = d3.path();
    let curve = d3.curveLinear(buffer);
    curve.lineStart();

    let fillDirection = resolveGlyphProperty(modifier.fillDirection, d);
    let range = yScale.range();

    if (fillDirection == FillDirection.Down) {
      // add a dummy point at what is effectively (0,0)
      curve.point(d.c.xScale(d.a.start), range[1]);
    } else {
      // add a dummy point at what is effectively (0,<max>)
      curve.point(d.c.xScale(d.a.start), d.c.rowHeight);
    }

    for (const [i, value] of d.a.values.entries()) {
      curve.point(d.c.xScale(d.a.start + i), yScale(value));
    }

    if (fillDirection == FillDirection.Down) {
      // add a dummy point at what is effectively (<end>,0)
      curve.point(d.c.xScale(d.a.start + d.a.values.length), range[1]);
      curve.point(d.c.xScale(d.a.start), range[1]);
    } else {
      // add a dummy point at what is effectively (<end>,<max>)
      curve.point(d.c.xScale(d.a.start + d.a.values.length), d.c.rowHeight);
      curve.point(d.c.xScale(d.a.start), d.c.rowHeight);
    }

    curve.lineEnd();
    return buffer.toString();
  };
}

/**
 * A class that manages the styling and positioning of a group of area glyphs.
 * @internal
 */
export class AreaModifier<
  A extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  d: GlyphProperty<A, C, string>;
  fillDirection: GlyphCallback<A, C, FillDirection>;

  constructor(config: GlyphModifierConfig<A, C> & AreaConfig<A, C>) {
    super(config);
    this.d = getDefaultAreaFn(this);
    this.fillDirection = callbackifyOrDefault(
      config.fillDirection,
      () => FillDirection.Down
    );

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "transform", property: (d) => `translate(0, ${this.y(d)})` },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor || "black" },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor || "black" },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "d", property: this.d },
    ]);
  }
}

/**
 * An interface that defines the parameters for a call to the area rendering function.
 */
export interface AreaConfig<A extends PlotAnnotation, C extends Chart<any>>
  extends LinePlotConfig<A, C> {
  fillDirection?: GlyphProperty<A, C, FillDirection>;
}

/**
 * This renders PlotAnnotations as area glyphs in a Chart.
 * @param config
 */
export function area<A extends PlotAnnotation, C extends Chart<any>>(
  config: AreaConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-area-glyph");

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    elementType: "path",
  });

  let data = binding.g
    .selectAll<SVGPathElement, AnnotationDatum<A, C>>(`path.${selector}`)
    .data();

  initializePlotGlyphYScales(areaScaleMap, {
    ...config,
    data,
  });

  let areaModifier = new AreaModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(areaModifier);

  return binding.g;
}
