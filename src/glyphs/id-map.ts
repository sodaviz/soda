import { Annotation } from "../annotations";

/**
 * @internal
 */
export const idAnnotationMap: Map<string, Annotation> = new Map();

/**
 * This returns a list of all of the Annotation IDs that have been used to render glyphs.
 */
export function getAllAnnotationIds(): string[] {
  return Array.from(idAnnotationMap.keys());
}

/**
 * This function produces a reference to Annotation object that is mapped with the provided string id. It will throw
 * an exception if the id is not in the internal map.
 * @param id
 */
export function getAnnotationById(id: string): Annotation {
  let annotation = idAnnotationMap.get(id);
  if (annotation == undefined) {
    throw `The Annotation id ${id} is not mapped to any Annotation`;
  }
  return annotation;
}
