import { getSelectionById } from "../glyphs/id-map";
import { Annotation } from "../annotations/annotation";
import { InteractionCallback } from "./interaction-callback";
import { Chart } from "../charts/chart";
import { AnnotationDatum } from "../glyphs/bind";

/**
 * @internal
 */
const clickBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of click behaviors that are associated with an Annotation object.
 * @param ann
 */
function getClickList<A extends Annotation>(ann: A): Function[] {
  let list = clickBehaviorMap.get(ann.id);
  if (list == undefined) {
    list = [];
    clickBehaviorMap.set(ann.id, list);
  }
  return list;
}

/**
 * A simple interface to provide a common pattern for defining behavior that should be executed when a SODA glyph is
 * clicked by a user.
 */
export interface ClickConfig<A extends Annotation, C extends Chart<any>> {
  /**
   * The annotations that are going to get the click behavior.
   */
  annotations: A[];
  /**
   * A callback function that will be responsible for executing the click behavior. It will implicitly receive
   * references to both a D3 Selection to the Annotation's representative glyph and the Annotation object itself.
   */
  click: InteractionCallback<A, C>;
}

/**
 * Add a click behavior to a list of glyphs.
 * @param ann
 * @param config
 */
export function clickBehavior<A extends Annotation, C extends Chart<any>>(
  config: ClickConfig<A, C>
): void {
  for (const ann of config.annotations) {
    let clickList = getClickList(ann);
    clickList.push(config.click);
    let selection = getSelectionById(ann.id);
    // prettier-ignore
    selection
      .on("click", click);
  }
}

/**
 * A generic function that is actually routed to the click event on a SODA glyph. When called, it will retrieve the
 * list of click behaviors associated with that glyph, and run the callback function for each behavior.
 * @param datum
 */
function click<A extends Annotation, C extends Chart<any>>(
  datum: AnnotationDatum<A, C>
): void {
  let selection = getSelectionById(datum.a.id);
  let behaviors = getClickList(datum.a);
  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}
