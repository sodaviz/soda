import { Annotation } from "../annotations/annotation";
import { AnnotationGroup } from "../annotations/annotation-group";
import { generateId } from "./id-generation";

/**
 * This defines the parameters for a call to an Annotation aggregration function.
 */
export interface aggregationConfig<A extends Annotation> {
  /**
   * The list of Annotations to be aggregated.
   */
  annotations: A[];
  /**
   * The comparison function that serves as the criterion for aggregation.
   * @param a
   * @param b
   */
  criterion: (a: A, b: A) => boolean;
  /**
   * The ID prefix for each resulting AnnotationGroup. E.g. if the idPrefix "group" is supplied, the resulting
   * groups will have IDs of the form: "group-1," "group-2," etc.
   */
  idPrefix?: string;
}

/**
 * A utility function that aggregates Annotation objects into Annotation groups based off of the supplied criterion.
 * This function assumes that your aggregation criterion is transitive, i.e. if criterion(a, b) and criterion(b, c)
 * evaluate to true, then criterion(a, c) must evaluate to true.
 *
 * For example, you may want to aggregate Annotations that share the same value on a specific property.
 *
 * two given Annotations.
 * @param config
 */
export function aggregateTransitive<A extends Annotation>(
  config: aggregationConfig<A>
): AnnotationGroup<A>[] {
  let annCopy = config.annotations.slice();
  let groups: AnnotationGroup<A>[] = [];

  while (annCopy.length > 0) {
    let group = new AnnotationGroup<A>({
      id: generateId(config.idPrefix || "transitively-aggregated-group"),
    });
    let groupRepresentative = annCopy[0];
    group.add(groupRepresentative);
    arraySwapRemove(annCopy, 0);
    for (let idx = 0; idx < annCopy.length; idx++) {
      if (config.criterion(groupRepresentative, annCopy[idx])) {
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
 * A utility function that aggregates Annotation objects into Annotation groups based off of the supplied criterion.
 * This function assumes that your aggregation criterion is not transitive, i.e. if criterion(a, b)  and criterion(b, c)
 * evaluate to true, then criterion(a, c) doesn't necessarily evaluate to true.
 *
 * For example, you may want to aggregate Annotations that collectively overlap in their semantic coordinate space.
 *
 * two given Annotations.
 * @param config
 */
export function aggregateIntransitive<A extends Annotation>(
  config: aggregationConfig<A>
): AnnotationGroup<A>[] {
  let annCopy = config.annotations.slice();
  let groups: AnnotationGroup<A>[] = [];

  while (annCopy.length > 0) {
    let group = new AnnotationGroup<A>({
      id: generateId("transitively-aggregated-group"),
    });
    group.add(annCopy[0]);
    arraySwapRemove(annCopy, 0);
    for (let idx = 0; idx < annCopy.length; idx++) {
      let annA = annCopy[idx];
      for (const annB of group.group) {
        if (config.criterion(annA, annB)) {
          group.add(annCopy[idx]);
          arraySwapRemove(annCopy, idx);
          idx--;
        }
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
