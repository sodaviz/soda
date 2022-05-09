import * as d3 from "d3";
import { keyFromSelection } from "../glyph-utilities/glyph-map";

/**
 * A utility function that retrieves a list of behavior functions for an interaction.
 * @internal
 * @param selection
 * @param behaviorMap
 */
export function getBehaviorList(
  selection: d3.Selection<any, any, any, any>,
  behaviorMap: Map<string, Function[]>
): Function[] {
  let key = keyFromSelection(selection);
  let list = behaviorMap.get(key);
  if (list == undefined) {
    list = [];
    behaviorMap.set(key, list);
  }
  return list;
}
