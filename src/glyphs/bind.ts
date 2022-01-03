import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "./glyph-config";
import { mapGlyphs } from "./glyph-map";

/**
 * An interface that simply joins an Annotation object and a Chart is has been rendered in.
 */
export interface AnnotationDatum<A extends Annotation, C extends Chart<any>> {
  /**
   * The Annotation object.
   */
  a: A;
  /**
   * The Chart object.
   */
  c: C;
}

/**
 * An enumeration of the targets in a Chart that an Annotation can be bound to.
 */
export enum BindTarget {
  /**
   * The default viewport of a Chart.
   */
  Viewport = "viewport",
  /**
   * The secondary viewport of a Chart in which a glyph is allowed to render outside the explicit bounds.
   */
  Overflow = "overflow",
  /**
   * The defs section, where things like patterns are supposed to go.
   */
  Defs = "defs",
}

/**
 * An interface that defines the parameters for calls to the bind function.
 * @internal
 */
export interface BindConfig<A extends Annotation, C extends Chart<any>> {
  annotations: A[];
  chart: C;
  target?: BindTarget | d3.Selection<any, any, any, any>;
  elementType: string;
  selector: string;
  internalSelector: string;
  overflow?: boolean;
  remove?: boolean;
}

/**
 * An interface that holds the enter, merge, and exit resulting from a call to d3.selection.data().
 * @internal
 */
export interface Binding<
  A extends Annotation,
  C extends Chart<any>,
  E extends Element
> {
  g: d3.Selection<SVGGElement, string, Element, any>;
  enter: d3.Selection<E, AnnotationDatum<A, C>, SVGGElement, string>;
  merge: d3.Selection<E, AnnotationDatum<A, C>, SVGGElement, string>;
  exit: d3.Selection<E, AnnotationDatum<A, C>, SVGGElement, string>;
}

/**
 * Bind Annotation data to a group of new dom elements with D3.
 * @internal
 * @param selector
 * @param elementType
 * @param config
 */
export function bind<
  A extends Annotation,
  C extends Chart<any>,
  E extends Element
>(config: BindConfig<A, C>): Binding<A, C, E> {
  let parent;
  if (config.target == BindTarget.Viewport) {
    parent = config.chart.viewportSelection;
  } else if (config.target == BindTarget.Overflow) {
    parent = config.chart.overflowViewportSelection;
  } else if (config.target == BindTarget.Defs) {
    parent = config.chart.defSelection;
  } else {
    parent = config.target || config.chart.viewportSelection;
  }

  let g: d3.Selection<SVGGElement, string, any, any>;
  let gSelection = parent.selectAll<SVGGElement, string>(
    `g.${config.selector}`
  );
  if (gSelection.node() != undefined) {
    g = d3.select<SVGGElement, string>(gSelection.node()!);
  } else {
    g = gSelection
      .data([config.selector], (d: string) => d)
      .enter()
      .append("g")
      .attr("class", (d) => d);
  }

  let data: AnnotationDatum<A, C>[] = config.annotations.map((a) => {
    return { a: a, c: config.chart };
  });

  let dataSelection = g
    .selectAll<E, AnnotationDatum<A, C>>(
      `${config.elementType}.${config.internalSelector}`
    )
    .data(data, (d) => d.a.id);

  let enter = dataSelection
    .enter()
    .append<E>(config.elementType)
    .attr("class", config.internalSelector);

  let merge = enter.merge(dataSelection);

  let exit = dataSelection.exit<AnnotationDatum<A, C>>();
  dataSelection.exit().remove();

  let binding: Binding<A, C, E> = {
    g,
    enter,
    merge,
    exit,
  };

  mapGlyphs({
    binding,
    chart: config.chart,
  });

  return binding;
}
