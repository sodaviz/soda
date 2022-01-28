import * as d3 from "d3";
/**
 * A utility function that builds a key for a behavior map from a GlyphMapping.
 * @internal
 * @param selection
 */
function keyFromSelection(selection: d3.Selection<any, any, any, any>): string {
  let datum = selection.datum();
  let selector = selection.attr("class");
  return `${datum.a.id}.${selector}.${datum.c.id}`;
}

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
