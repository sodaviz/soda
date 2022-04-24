import { PlotAnnotation } from "../../annotations/plot-annotation";
import { Chart } from "../../charts/chart";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import * as d3 from "d3";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";
import { LinePlotConfig } from "./line-plot";
import { generateId } from "../../utilities/id-generation";
import { initializePlotGlyphYScales } from "../plots";

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

    let fillDirection = resolveValue(modifier.fillDirection, d);
    let range = yScale.range();

    if (fillDirection == FillDirection.Down) {
      // add a dummy point at what is effectively (0,0)
      curve.point(
        d.c.xScale(d.a.start),
        resolveValue(modifier.row, d) * d.c.rowHeight + range[1]
      );
    } else {
      // add a dummy point at what is effectively (0,<max>)
      curve.point(
        d.c.xScale(d.a.start),
        resolveValue(modifier.row, d) * d.c.rowHeight
      );
    }

    for (const [i, value] of d.a.values.entries()) {
      curve.point(
        d.c.xScale(d.a.start + i),
        resolveValue(modifier.row, d) * d.c.rowHeight + yScale(value)
      );
    }

    if (fillDirection == FillDirection.Down) {
      // add a dummy point at what is effectively (<end>,0)
      curve.point(
        d.c.xScale(d.a.start + d.a.values.length),
        resolveValue(modifier.row, d) * d.c.rowHeight + range[1]
      );
    } else {
      // add a dummy point at what is effectively (<end>,<max>)
      curve.point(
        d.c.xScale(d.a.start + d.a.values.length),
        resolveValue(modifier.row, d) * d.c.rowHeight
      );
    }

    curve.lineEnd();
    return buffer.toString();
  };
}

/**
 * An interface that defines the parameters for instantiating an AreaModifier.
 * @internal
 */
export type AreaModifierConfig<
  A extends PlotAnnotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & AreaConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of area glyphs.
 * @internal
 */
export class AreaModifier<
  A extends PlotAnnotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  pathData: GlyphProperty<A, C, string>;
  fillDirection: GlyphProperty<A, C, FillDirection>;

  constructor(config: AreaModifierConfig<A, C>) {
    super(config);
    this.pathData = getDefaultAreaFn(this);
    this.fillDirection = config.fillDirection || FillDirection.Down;
  }

  defaultZoom() {
    this.applyD();
  }

  applyD(): void {
    this.applyAttr("d", this.pathData);
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

  initializePlotGlyphYScales(areaScaleMap, {
    ...config,
    data,
  });

  let areaModifier = new AreaModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(areaModifier);

  return binding.g;
}
