import * as d3 from "d3";
import { Annotation } from "../annotations/annotation";
import { InteractionCallback } from "./interaction-callback";
import { Chart } from "../charts/chart";
import { InteractionConfig } from "./interaction-config";
import { queryGlyphMap } from "../glyph-utilities/glyph-map";
import { getBehaviorList } from "./interaction-list";

/**
 * @internal
 */
const clickBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of click behaviors that are associated with an Annotation object.
 * @internal
 * @param selection
 */
function getClickList(selection: d3.Selection<any, any, any, any>): Function[] {
  return getBehaviorList(selection, clickBehaviorMap);
}

/**
 * An interface that defines the parameters for a call to the clickBehavior function.
 */
export interface ClickConfig<A extends Annotation, C extends Chart<any>>
  extends InteractionConfig<A, C> {
  /**
   * A callback function that will be responsible for executing the click behavior. It will implicitly receive
   * references to both a D3 Selection to the Annotation's representative glyph and the Annotation object itself.
   */
  click: InteractionCallback<A, C>;
}

/**
 * Remove all click behaviors by associated keys.
 * @internal
 * @param keys
 */
export function removeClickBehaviorsByKeys(keys: string[]): void {
  for (const key of keys) {
    clickBehaviorMap.delete(key);
  }
}

/**
 * This applies click interactions to a list of Annotations.
 * @param config
 */
export function clickBehavior<A extends Annotation, C extends Chart<any>>(
  config: ClickConfig<A, C>
): void {
  let selections = queryGlyphMap(config);

  if (selections == undefined) {
    console.warn("Glyph query failed when attempting to map click behavior");
    return;
  }

  for (const selection of selections) {
    applyClickCallbacks(selection, config);
  }
}

function applyClickCallbacks(
  selection: d3.Selection<any, any, any, any>,
  config: ClickConfig<any, any>
): void {
  getClickList(selection).push(config.click);
  selection.on("click", () => click(selection));
}

/**
 * A generic function that is actually routed to the click event on a SODA glyph. When called, it will retrieve the
 * list of click behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 * @param selection
 */
function click<A extends Annotation, C extends Chart<any>>(
  selection: d3.Selection<any, any, any, any>
): void {
  let datum = selection.datum();
  let behaviors = getClickList(selection);

  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}
