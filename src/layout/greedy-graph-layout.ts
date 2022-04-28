import { Annotation } from "../annotations/annotation";
import { AnnotationGraph } from "./annotation-graph";
import { AnnotationDatum } from "../glyph-utilities/bind";
import { MapVerticalLayout } from "./vertical-layout";
import { Chart } from "../charts/chart";

/**
 * @internal
 */
const DEFAULT_VERTEX_SORT = (
  verts: string[],
  graph: AnnotationGraph<Annotation>
) => {
  // the default vertex sort function; it just sorts by annotation width
  verts.sort((v1: string, v2: string) => {
    let ann1 = graph.getAnnotationFromId(v1);
    let ann2 = graph.getAnnotationFromId(v2);
    let w1 = ann1.end - ann1.start;
    let w2 = ann2.end - ann2.start;
    if (w1 > w2) {
      return -1;
    } else {
      return 1;
    }
  });
};

/**
 * This function takes a list of Annotation objects and uses a deterministic greedy graph coloring algorithm to assign
 * each of them a y coordinate in terms of horizontal bins that will prevent any horizontal overlap when they are
 * rendered in a Chart.
 * @param ann
 * @param tolerance
 * @param vertSortFunction
 */
export function greedyGraphLayout<A extends Annotation>(
  ann: A[],
  tolerance: number = 0,
  vertSortFunction: {
    (verts: string[], graph: AnnotationGraph<A>): void;
  } = DEFAULT_VERTEX_SORT
) {
  if (ann.length == 0) {
    return 0;
  }
  let graph: AnnotationGraph<A> = new AnnotationGraph(ann, tolerance);
  let colors: Map<string, number> = new Map();
  let nextColor = 0;
  while (graph.edges.size > 0) {
    // we use this map to determine whether or not we
    // still want to consider each vert in this iteration
    let vertAvailable: Map<string, boolean> = new Map();
    // get the list of vertices remaining in the graph
    let verts = graph.getVertices();
    // sort them by whatever metric we are using
    // the default is to by annotation width
    vertSortFunction(verts, graph);
    for (const v of verts) {
      vertAvailable.set(v, true);
    }
    for (const v of verts) {
      if (vertAvailable.get(v)) {
        // take the first node and assign it a color
        colors.set(graph.getAnnotationFromId(v).id, nextColor);

        for (const v2 of graph.getEdges(v)) {
          // remove all of that nodes adjacent nodes from consideration
          vertAvailable.delete(v2);
        }
        // now remove that node entirely
        vertAvailable.delete(v);
        graph.edges.delete(v);
      }
    }
    nextColor++;
  }

  let layout = <MapVerticalLayout>(
    function (
      this: MapVerticalLayout,
      d: AnnotationDatum<Annotation, Chart<any>>
    ): number {
      let row = this.rowMap.get(d.a.id);
      return row || 0;
    }
  );
  layout.rowMap = colors;
  layout.rowCount = nextColor;

  return layout;
}
