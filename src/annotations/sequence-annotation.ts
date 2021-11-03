import { Annotation, AnnotationConfig } from "./annotation";

/**
 * An enum to represent the type of a column in a sequence alignment.
 */
export enum ColumnType {
  /**
   * This represents a match in the sequence alignment.
   */
  Match = "0",
  /**
   * This represents a substitution in a sequence alignment.
   */
  Substitution = "1",
  /**
   * This represents a gap in a sequence alignment.
   */
  Deletion = "2",
  /**
   * This represents an insertion in a sequence alignment.
   */
  Insertion = "3",
}

/**
 * An interface that defines the parameters for initializing a SequenceAnnotation.
 */
export interface SequenceAnnotationConfig extends AnnotationConfig {
  /**
   * The sequence string to be rendered.
   */
  sequence: string;
  /**
   * An array of ColumnTypes, which should indicate the type of each position in the sequence. This array should
   * be the same length as the sequence string.
   */
  columnTypes?: ColumnType[];
  // /**
  //  * An array of tuples describing insertions in the sequence (e.g. for rendering a sequence alignment when we
  //  * don't want to render gaps in the chromosome). The tuples are of the form [position, length], where position
  //  * is the position before the insertion and the length is the number of characters of the insertion.
  //  */
  // insertions?: [number, number];
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
  /**
   * An array of [position, character] from the sequence.
   */
  characters: [number, string][];
  /**
   * An array that describes the type of each position
   */
  columnTypes: ColumnType[];
  // insertions: [number, number] | undefined;

  public constructor(conf: SequenceAnnotationConfig) {
    super(conf);
    this.sequence = conf.sequence;
    this.characters = this.sequence
      .split("")
      .map((c, i) => [i + this.start, c]);

    // this.insertions = conf.insertions;

    if (conf.columnTypes != undefined) {
      this.columnTypes = conf.columnTypes;
    } else {
      this.columnTypes = new Array<ColumnType>(this.characters.length).fill(
        ColumnType.Match
      );
    }
  }
}
