import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { mapIdToAnnotation, mapIdToSelection } from "./id-map";
import { GlyphConfig } from "./glyph-config";

export interface AnnotationDatum<A extends Annotation, C extends Chart> {
  a: A;
  c: C;
}

export enum BindTarget {
  Viewport = "viewport",
  Overflow = "overflow",
  Defs = "defs",
}

export interface BindConfig<A extends Annotation, C extends Chart<any>> {
  annotations: A[];
  chart: C;
  target?: BindTarget | d3.Selection<any, any, any, any>;
  elementType: string;
  selector: string;
  overflow?: boolean;
  remove?: boolean;
}

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

export function bind<
  A extends Annotation,
  C extends Chart<any>,
  E extends Element
>(
  selector: string,
  elementType: string,
  config: GlyphConfig<A, C>
): Binding<A, C, E> {
  let parent;
  if (config.bindTarget == BindTarget.Viewport) {
    parent = config.chart.viewportSelection;
  } else if (config.bindTarget == BindTarget.Overflow) {
    parent = config.chart.overflowViewportSelection;
  } else if (config.bindTarget == BindTarget.Defs) {
    parent = config.chart.defSelection;
  } else {
    parent = config.bindTarget || config.chart.viewportSelection;
  }

  let g = parent
    .selectAll<SVGGElement, string>(`g.${config.selector}`)
    .data([selector], (d: string) => d)
    .enter()
    .append("g")
    .attr("class", (d) => d);

  let data: AnnotationDatum<A, C>[] = config.annotations.map((a) => {
    return { a: a, c: config.chart };
  });

  let dataSelection = g
    .selectAll<E, AnnotationDatum<A, C>>(`${elementType}.${selector}`)
    .data(data, (d) => d.a.id);

  let enter = dataSelection.enter().append<E>(elementType);

  let merge = enter.merge(dataSelection);

  let exit = dataSelection.exit<AnnotationDatum<A, C>>();
  dataSelection.exit().remove();

  merge.each((d, i, nodes) => {
    mapIdToSelection(d.a.id, d3.select(nodes[i]));
    mapIdToAnnotation(d.a.id, d.a);
  });

  return { g, enter, merge, exit };
}
