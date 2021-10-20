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
 * A simple interface to define the arguments for the SequenceAnnotation constructor.
 */
export interface SequenceAnnotationConfig extends AnnotationConfig {
  /**
   * The sequence string to be rendered in the visualization.
   */
  sequence: string;
  /**
   * An array of ColumnTypes, which should indicate the type of each character in the sequence. This array should
   * be the same length as the sequence string.
   */
  columnTypes?: ColumnType[];
  /**
   * An array of tuples describing insertions in the sequence (e.g. for rendering a sequence alignment when we
   * don't want to render gaps in the chromosome). The tuples are of the form [position, length], where position
   * is the position before the insertion and the length is the number of characters of the insertion.
   */
  insertions?: [number, number];
}

/**
 * An Annotation extension for annotations that are rendered as text. The general idea is that if
 * an Annotation represents a sequence alignment, each character in the query sequence can be rendered at the
 * semantic chromosome position that it was aligned to. This works, but it's far from optimized and will likely
 * cause performance issues.
 */
export class SequenceAnnotation extends Annotation {
  /**
   * The sequence string to be rendered in the visualization.
   */
  sequence: string;
  characters: [number, string][];
  columnTypes: ColumnType[];
  insertions: [number, number] | undefined;

  public constructor(conf: SequenceAnnotationConfig) {
    super(conf);
    this.sequence = conf.sequence;
    this.characters = this.sequence
      .split("")
      .map((c, i) => [i + this.start, c]);

    this.insertions = conf.insertions;

    if (conf.columnTypes != undefined) {
      this.columnTypes = conf.columnTypes;
    } else {
      this.columnTypes = new Array<ColumnType>(this.characters.length).fill(
        ColumnType.Match
      );
    }
  }
}
