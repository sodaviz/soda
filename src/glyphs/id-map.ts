import * as d3 from "d3";
import { Annotation } from "../annotations";

/**
 * @internal
 */
export const idAnnotationMap: Map<string, Annotation> = new Map();
/**
 * @internal
 */
export const idSelectionMap: Map<
  string,
  d3.Selection<any, any, any, any>
> = new Map();
/**
 * @internal
 */
export const idSelectionListMap: Map<
  string,
  d3.Selection<any, any, any, any>[]
> = new Map();

/**
 * This returns a list of all of the Annotation IDs that have been used to render glyphs.
 */
export function getAllAnnotationIds(): string[] {
  return Array.from(idAnnotationMap.keys());
}

/**
 * This function stores a reference to an Annotation object in an internal map that is keyed by string id's. By
 * default, the SODA rendering module will call this function to map each rendered Annotation with its id property.
 * @param id
 * @param ann
 */
export function mapIdToAnnotation(id: string, ann: Annotation): void {
  idAnnotationMap.set(id, ann);
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

/**
 * This function stores a reference to a D3 selection to an Annotation glyph in an internal map that is keyed by a
 * unique string id.
 * @param id
 * @param selection
 */
export function mapIdToSelection(
  id: string,
  selection: d3.Selection<any, any, any, any>
): void {
  idSelectionMap.set(id, selection);
  let list = idSelectionListMap.get(id) || [];
  list.push(selection);
  idSelectionListMap.set(id, list);
}

/**
 * This function produces a reference to D3 Selection that is mapped with the provided string id. It will throw
 * an exception if the id is not in the internal map.
 * @param id
 */
export function getSelectionById(id: string): d3.Selection<any, any, any, any> {
  let selection = idSelectionMap.get(id);
  if (selection == undefined) {
    throw `The Annotation id ${id} is not mapped to any D3 selection`;
  }
  return selection;
}

export function getSelectionListById(
  id: string
): d3.Selection<any, any, any, any>[] {
  let list = idSelectionListMap.get(id);
  if (list == undefined) {
    throw `The Annotation id ${id} is not mapped to any D3 selection`;
  }
  return list;
}
