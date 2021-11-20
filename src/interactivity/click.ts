import { getSelectionById } from "../glyphs/id-map";
import { Annotation } from "../annotations/annotation";
import { InteractionCallback } from "./interaction-callback";
import { Chart } from "../charts/chart";
import { AnnotationDatum } from "../glyphs/bind";
import { InteractionConfig } from "./interaction-config";

/**
 * @internal
 */
const clickBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of click behaviors that are associated with an Annotation object.
 * @param ann
 * @internal
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
 * This applies click interactions to a list of Annotations.
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
 * @internal
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
