import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { AnnotationDatum } from "../glyphs/bind";

/**
 * A type that describes the callback function format for interactions.
 * @internal
 */
export type InteractionCallback<A extends Annotation, C extends Chart<any>> = {
  (
    /**
     * A d3 selection to the glyph that the interaction is bound to.
     */
    s: d3.Selection<any, AnnotationDatum<A, C>, any, any>,
    /**
     * The AnnotationDatum bound to the glyph that the interaction is bound to.
     */
    d: AnnotationDatum<A, C>
  ): void;
};
