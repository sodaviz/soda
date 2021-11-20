import { getSelectionById } from "../glyphs/id-map";
import { Annotation } from "../annotations/annotation";
import { AnnotationDatum } from "../glyphs/bind";
import { Chart } from "../charts/chart";
import { InteractionCallback } from "./interaction-callback";
import { InteractionConfig } from "./interaction-config";

/**
 * @internal
 */
const mouseoverBehaviorMap: Map<string, Function[]> = new Map();
/**
 * @internal
 */
const mouseoutBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of mouseover behaviors that are associated with an Annotation object.
 * @param ann
 * @internal
 */
function getMouseoverList<A extends Annotation>(ann: A): Function[] {
  let list = mouseoverBehaviorMap.get(ann.id);
  if (list == undefined) {
    list = [];
    mouseoverBehaviorMap.set(ann.id, list);
  }
  return list;
}

/**
 * This function returns the list of mouseout behaviors that are associated with an Annotation object.
 * @param ann
 * @internal
 */
function getMouseoutList<A extends Annotation>(ann: A): Function[] {
  let list = mouseoutBehaviorMap.get(ann.id);
  if (list == undefined) {
    list = [];
    mouseoutBehaviorMap.set(ann.id, list);
  }
  return list;
}

/**
 * An interface that defines the parameters for a call to the hoverBehavior function.
 */
export interface HoverConfig<A extends Annotation, C extends Chart<any>>
  extends InteractionConfig<A, C> {
  /**
   * A callback function that will be responsible for executing the mouseover behavior. It receives a d3 selection
   * of the glyph and the Annotation object it represents as arguments.
   */
  mouseover: InteractionCallback<A, C>;
  /**
   * A callback function that will be responsible for executing the mouseout behavior. It receives a d3 selection
   * of the glyph and the Annotation object it represents as arguments.
   */
  mouseout: InteractionCallback<A, C>;
}

/**
 * This applies hover interactions to a list of Annotations.
 * @param config
 */
export function hoverBehavior<A extends Annotation, C extends Chart<any>>(
  config: HoverConfig<A, C>
): void {
  for (const ann of config.annotations) {
    let mouseoverList = getMouseoverList(ann);
    mouseoverList.push(config.mouseover);
    let mouseoutList = getMouseoutList(ann);
    mouseoutList.push(config.mouseout);
    let selection = getSelectionById(ann.id);
    // prettier-ignore
    selection
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
  }
}

/**
 * A generic function that is actually routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseover behaviors associated with that glyph, and run the callback function for each behavior.
 * @param datum
 * @internal
 */
function mouseover<A extends Annotation, C extends Chart<any>>(
  datum: AnnotationDatum<A, C>
): void {
  let selection = getSelectionById(datum.a.id);
  let behaviors = getMouseoverList(datum.a);
  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}

/**
 * A generic function that is actually routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseout behaviors associated with that glyph, and run the callback function for each behavior.
 * @param datum
 * @internal
 */
function mouseout<A extends Annotation, C extends Chart<any>>(
  datum: AnnotationDatum<A, C>
): void {
  let selection = getSelectionById(datum.a.id);
  let behaviors = getMouseoutList(datum.a);
  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}
