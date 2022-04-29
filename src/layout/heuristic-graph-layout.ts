import { cloneDeep } from "lodash";
import { Annotation } from "../annotations/annotation";
import { AnnotationGraph } from "./annotation-graph";
import { MapVerticalLayout } from "./vertical-layout";
import { AnnotationDatum } from "../glyph-utilities/bind";
import { Chart } from "../charts/chart";

/**
 * This function takes a list of Annotation objects and uses a non-deterministic greedy graph coloring heuristic to
 * assign each of them a y coordinate in terms of horizontal bins that will prevent any horizontal overlap when they are
 * rendered in a Chart.
 * @param ann
 * @param tolerance
 * @param nIters
 */
export function heuristicGraphLayout(
  ann: Annotation[],
  nIters: number = 100,
  tolerance: number = 0
) {
  if (ann.length == 0) {
    return 0;
  }

  const graph = new AnnotationGraph(ann, tolerance);

  // we will make copies of the maps, since the
  // algorithm clobbers them in each iteration
  let edgesCopy = cloneDeep(graph.edges);

  // the number of colors in the best coloring so far
  let bestColorCnt = Infinity;
  // this maps node->{color in best coloring}
  let bestColors: Map<string, number> = new Map();
  // we use integers to enumerate the colors
  let nextColor = -1;
  // this algorithm works as follows:
  //   select a random set of nodes that are non-adjacent and assign them a color
  //   remove those nodes from the graph
  //   repeat the process with the remaining subgraph until all nodes are colored
  for (let i = 0; i < nIters; i++) {
    // this maps node->{color in best coloring} at the current iteration
    const colors: Map<string, number> = new Map();
    nextColor = 0;
    while (edgesCopy.size > 0) {
      // we use this map to determine whether or not we
      // still want to consider each vert in this iteration
      let vertAvailable: Map<string, boolean> = new Map();
      // take a random ordering of the remaining nodes
      let verts = shuffle(Array.from(edgesCopy.keys()));

      for (const n of verts) {
        vertAvailable.set(n, true);
      }
      for (const n of verts) {
        if (vertAvailable.get(n)) {
          // take the next vertex and assign it a color
          colors.set(n, nextColor);

          for (const n2 of edgesCopy.get(n)!) {
            // remove all of that vertices adjacent vertices from consideration
            vertAvailable.delete(n2);
          }
          // now remove that vertex entirely
          vertAvailable.delete(n);
          edgesCopy.delete(n);
        }
      }
      nextColor++;
    }
    edgesCopy = cloneDeep(graph.edges);

    if (nextColor < bestColorCnt) {
      bestColorCnt = nextColor;
      bestColors = colors;
    }
  }

  let layout = {
    rowMap: bestColors,
    row: function (this, d: AnnotationDatum<any, Chart<any>>): number {
      let row = this.rowMap.get(d.a.id);
      return row || 0;
    },
    rowCount: bestColorCnt,
  };

  return layout;
}

/**
 * @internal
 */
function shuffle(a: string[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
