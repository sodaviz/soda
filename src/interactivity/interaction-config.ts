import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";

/**
 * A common interface for configuring interactions.
 * @internal
 */
export interface InteractionConfig<A extends Annotation, C extends Chart<any>> {
  /**
   * The Chart to which the interaction is applied.
   */
  chart?: C;
  /**
   * The Annotations to which the interaction is applied.
   */
  annotations: A[];
}
