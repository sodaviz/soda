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

/**
 * A utility function that aggregates Annotation objects into Annotation groups based off of the supplied criteria.
 * This function assumes that your aggregation criteria is transitive, i.e. if criteria(a, b) = true and criteria(b,
 * c) = true, then criteria(a, c) = true.
 * @param annotations The annotations to aggregate.
 * @param criteria The callback function that determines whether or not the aggregation criteria is true for any
 * two given Annotations.
 */
export function aggregateTransitive<A extends Annotation>(
  annotations: A[],
  criteria: (a: A, b: A) => boolean
): AnnotationGroup<A>[] {
  let annCopy = annotations.slice();
  let groups: AnnotationGroup<A>[] = [];

  while (annCopy.length > 0) {
    let group = new AnnotationGroup<A>({});
    let groupRepresentative = annCopy[0];
    group.add(groupRepresentative);
    arraySwapRemove(annCopy, 0);
    for (let idx = 0; idx < annCopy.length; idx++) {
      if (criteria(groupRepresentative, annCopy[idx])) {
        group.add(annCopy[idx]);
        arraySwapRemove(annCopy, idx);
        idx--;
      }
    }
    groups.push(group);
  }

  return groups;
}
/**
 * A utility function for removing an element from an array.
 * @param arr The array to remove an element from.
 * @param idx The index of the item to remove.
 * @internal
 */
function arraySwapRemove(arr: any[], idx: number) {
  arr[idx] = arr[arr.length - 1];
  arr.pop();
}
