import { Annotation } from "../annotations/annotation";
import {
  AnnotationGroup,
  AnnotationGroupConfig,
} from "../annotations/annotation-group";
import { AnnotationArrayGraph } from "../layout/annotation-graph";
import { generateId } from "./id-generation";

/**
 * This is a utility function that takes the provided Annotation objects and condenses them into Annotation groups.
 * Annotations will be placed in the same group if they are near each other (within the provided tolerance). This
 * may be useful for saving rendering performance in dense visualizations, but it's much preferable to do something
 * like this as a pre-processing step on your data.
 * @param ann
 * @param tolerance
 */
export function condenseAnnotations<A extends Annotation>(
  ann: A[],
  tolerance: number = 0
): AnnotationGroup<A>[] {
  let graph = new AnnotationArrayGraph(ann, tolerance);
  let components = graph.getComponents();

  let groups: AnnotationGroup<A>[] = [];
  for (const comp of components) {
    let conf: AnnotationGroupConfig<A> = {
      group: comp,
      id: generateId("condensed-group"),
    };
    let group = new AnnotationGroup(conf);
    groups.push(group);
  }
  return groups;
}
