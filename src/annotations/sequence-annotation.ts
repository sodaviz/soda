import { Annotation, AnnotationConfig } from "./annotation";

/**
 * An interface that defines the parameters for initializing a SequenceAnnotation.
 */
export interface SequenceAnnotationConfig extends AnnotationConfig {
  /**
   * The sequence string to be rendered.
   */
  sequence: string;
}

/**
 * An Annotation class that holds position specific sequence data. For instance, this can be used to render
 * each character in the query of a sequence alignment at the chromosome position that it was aligned to. This is pretty
 * expensive performance-wise.
 */
export class SequenceAnnotation extends Annotation {
  /**
   * The sequence string to be rendered in the visualization.
   */
  sequence: string;

  public constructor(conf: SequenceAnnotationConfig) {
    super(conf);
    this.sequence = conf.sequence;
  }
}
