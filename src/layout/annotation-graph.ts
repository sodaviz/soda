import { Annotation } from "../annotations/annotation";

/**
 * @internal
 */
function annotationsOverlap(
  a: Annotation,
  b: Annotation,
  tolerance: number = 0
) {
  return a.start - tolerance <= b.end && a.end + tolerance >= b.start;
}

/**
 * This class represents Annotations as a graph, in which there is an edge between two Annotations if they
 * horizontally overlap in semantic coordinate space. Internally, this object uses maps to describe degrees and
 * adjacency.
 * @internal
 */
export class AnnotationGraph<A extends Annotation> {
  /**
   * This maps from Annotation id's to Annotation objects
   */
  idMap: Map<string, A>;
  /**
   * This maps from Annotation id A to a list of Annotation id's that annotation id A shares an edge with.
   */
  edges: Map<string, string[]>;

  constructor(
    ann: A[],
    tolerance: number = 0,
    edgeFunction: (
      a: A,
      b: A,
      tolerance: number
    ) => boolean = annotationsOverlap
  ) {
    this.idMap = new Map();
    this.edges = new Map();

    for (const a of ann) {
      this.idMap.set(a.id, a);
      this.edges.set(a.id, []);
      for (const b of ann) {
        if (a == b) {
          continue;
        }
        if (edgeFunction(a, b, tolerance)) {
          this.edges.set(a.id, this.edges.get(a.id)!.concat(b.id));
        }
      }
    }
  }

  /**
   * Get a list of the IDs for each vertex in the graph.
   */
  public getVertices(): string[] {
    return Array.from(this.edges.keys());
  }

  /**
   * Get a list of the vertices with which the supplied vertex shares an edge with.
   * @param vertex The ID of the vertex to check.
   */
  public getEdges(vertex: string): string[] {
    let edges: string[] | undefined = this.edges.get(vertex);
    if (edges == undefined) {
      edges = [];
    }
    return edges;
  }

  /**
   * Get the actual Annotation object from a vertex ID.
   * @param id The vertex ID.
   */
  public getAnnotationFromId(id: string): A {
    let ann = this.idMap.get(id);
    if (ann == undefined) {
      throw `No annotation with id: ${id} in annotation graph`;
    }
    return ann;
  }
}

/**
 * This class represents Annotations as a graph, in which there is an edge between two Annotations if they
 * horizontally overlap in semantic coordinate space. Internally, this object uses arrays to describe degrees and
 * adjacency.
 * @internal
 */
export class AnnotationArrayGraph<A extends Annotation> {
  /**
   * A list of the Annotation objects in this graph.
   */
  ann: A[] = [];
  /**
   * This maps from Annotation id's to Annotation objects
   */
  idxMap: Map<string, number> = new Map();
  /**
   * This maps from Annotation id A to a list of Annotation id's that annotation id A shares an edge with.
   */
  edges: number[][] = [];
  /**
   * This maps from Annotation id A to the number of edges it shares with other Annotations.
   */
  degrees: number[] = [];

  constructor(
    ann: A[],
    tolerance: number = 0,
    edgeFunction: (
      a: A,
      b: A,
      tolerance: number
    ) => boolean = annotationsOverlap
  ) {
    this.ann = ann;

    for (const [a_idx, a] of this.ann.entries()) {
      this.idxMap.set(a.id, a_idx);
      this.degrees[a_idx] = 0;
      this.edges[a_idx] = [];
      for (const [b_idx, b] of this.ann.entries()) {
        if (a == b) {
          continue;
        }
        if (edgeFunction(a, b, tolerance)) {
          this.edges[a_idx].push(b_idx);
          this.degrees[a_idx]++;
        }
      }
    }
  }

  public getComponents(): A[][] {
    let components: A[][] = [];

    let vertAvailable: boolean[] = [];

    for (let v = 0; v < this.ann.length; v++) {
      vertAvailable[v] = true;
    }

    let comp = [];
    for (let v = 0; v < this.ann.length; v++) {
      if (vertAvailable[v]) {
        comp = [v];
        vertAvailable[v] = false;
        let neighbors = this.edges[v];
        while (neighbors.length > 0) {
          let nextNeighbors: number[] = [];
          for (const u of neighbors) {
            if (vertAvailable[u]) {
              comp.push(u);
              vertAvailable[u] = false;
              nextNeighbors = nextNeighbors.concat(this.edges[u]);
            }
          }
          neighbors = nextNeighbors;
        }
        components.push(comp.map((idx) => this.ann[idx]));
      }
    }
    return components;
  }

  /**
   * Get a list of the IDs for each vertex in the graph.
   */
  public getVertices(): string[] {
    return Array.from(this.idxMap.keys());
  }

  /**
   * Get a list of the Annotation IDs of the vertices with which the supplied Annotation ID shares an edge with.
   * @param annId The ID of the vertex to check.
   */
  public getEdgeIdsFromId(annId: string): string[] {
    let vertexIdx = this.idxMap.get(annId);
    if (vertexIdx == undefined) {
      return [];
    }
    return this.edges[vertexIdx].map((idx) => this.ann[idx].id);
  }

  /**
   * Get the actual Annotation object in the graph from an Annotation ID.
   * @param annId The Annotation ID.
   */
  public getAnnotationFromId(annId: string): A {
    let vertexIdx = this.idxMap.get(annId);
    if (vertexIdx == undefined) {
      throw `No annotation with id: ${annId} in annotation graph`;
    }
    return this.ann[vertexIdx];
  }
}
