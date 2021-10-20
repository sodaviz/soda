import { Annotation } from "../annotations/annotation";
import {
  AnnotationGroup,
  AnnotationGroupConfig,
} from "../annotations/annotation-group";
import { AnnotationArrayGraph } from "../layout/annotation-graph";
import { generateId } from "./id-generation";

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
