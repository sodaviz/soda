import { Annotation, AnnotationConfig } from "./annotation";
import { getSliceCoordinates } from "./annotation-utilities";

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

  public slice(start: number, end: number): SequenceAnnotation | undefined {
    if (this.start < end && this.end > start) {
      let sliceCoords = getSliceCoordinates(this, start, end);
      return new SequenceAnnotation({
        id: this.id,
        start: sliceCoords.start,
        end: sliceCoords.end,
        row: this.row,
        sequence: this.sequence.slice(
          sliceCoords.relativeStart,
          sliceCoords.relativeEnd
        ),
      });
    } else {
      return undefined;
    }
  }
}
