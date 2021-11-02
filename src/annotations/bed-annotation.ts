import { Annotation, AnnotationConfig } from "./annotation";
import { Orientation } from "./orientation";

/**
 * A simple interface that holds the arguments for a BedAnnotation constructor.
 */
export interface BedAnnotationConfig extends AnnotationConfig {
  chrom?: string;
  /**
   * The name of the record.
   */
  name?: string;
  /**
   * The score of the record.
   */
  score?: number;
  /**
   * The orientation of the record.
   */
  strand?: Orientation;
  /**
   * A BED field that describes at which coordinate the feature should stop being drawn "thickly."
   */
  thickStart?: number;
  /**
   * The color that the feature should be drawn.
   */
  thickEnd?: number;
  /**
   * The color that the feature should be drawn.
   */
  itemRgb?: string;
  blockCount?: number;
  blockSizes?: number[];
  blockStarts?: number[];
}

/**
 * An Annotation definition for BED records. For more information on BED records, see
 * https://genome.ucsc.edu/FAQ/FAQformat.html#format1.
 */
export class BedAnnotation extends Annotation {
  chrom?: string;
  /**
   * The name of the record.
   */
  name?: string;
  /**
   * The score of the record.
   */
  score?: number;
  /**
   * The orientation of the record.
   */
  strand?: Orientation;
  /**
   * A BED field that describes at which coordinate the feature should stop being drawn "thickly."
   */
  thickStart?: number;
  /**
   * The color that the feature should be drawn.
   */
  thickEnd?: number;
  /**
   * The color that the feature should be drawn.
   */
  itemRgb?: string;
  blockCount?: number;
  blockSizes?: number[];
  blockStarts?: number[];

  constructor(config: BedAnnotationConfig) {
    super(config);
    if (config.strand) {
      this.strand = config.strand;
    } else {
      this.strand = Orientation.Unoriented;
    }
    this.score = config.score;
    this.name = config.name;
    this.thickStart = config.thickStart;
    this.thickEnd = config.thickEnd;
    this.itemRgb = config.itemRgb;
  }
}
