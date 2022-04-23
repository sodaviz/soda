import { Annotation } from "./annotation";
import { Orientation } from "./orientation";
/**
 * An interface that describes BED records. For more information, see https://genome.ucsc.edu/FAQ/FAQformat.html#format1
 * @internal
 */
export interface BedRecord {
  /**
   * A BED3 field that describes the chromosome of the record.
   */
  chrom: string;
  /**
   * A BED3 field that describes the starting position of the record. This is chromStart in the BED spec, but it's
   * start here to fit in better with the rest of SODA.
   */
  start: number;
  /**
   * A BED3 field that describes the ending position of the record. This is chromEnd in the BED spec, but it's end
   * here to fit in better with the rest of SODA.
   */
  end: number;
  /**
   * A BED6 field that describes the name of the record.
   */
  name?: string;
  /**
   * A BED6 field that describes the "score" of the record.
   */
  score?: number;
  /**
   * A BED6 field that describes the orientation/strand of the record.
   */
  strand?: Orientation;
  /**
   * A BED9 field that describes at which coordinate the feature should start being drawn "thickly."
   */
  thickStart?: number;
  /**
   * A BED9 field that describes at which coordinate the feature should stop being drawn "thickly."
   */
  thickEnd?: number;
  /**
   * A BED9 field BED field that defines the color of the feature. It is an RGB string, e.g. (0, 1,
   * 256).
   */
  itemRgb?: string;
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the number of
   * fragments.
   */
  blockCount?: number;
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the size of each
   * fragment.
   */
  blockSizes?: number[];
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the offset of
   * each fragment.
   */
  blockStarts?: number[];
}

/**
 * A type that defines the parameters to initialize a BedAnnotation.
 */
export type BedAnnotationConfig = Annotation & BedRecord;

/**
 * @internal
 */
export interface BedAnnotation extends BedRecord, Annotation {}

/**
 * An Annotation definition for any BED records. Any fields up through BED12 are supported by this class, but
 * nothing beyond the BED3 fields are guaranteed to be defined. For more information on BED records, see
 * https://genome.ucsc.edu/FAQ/FAQformat.html#format1.
 */
export class BedAnnotation {
  constructor(config: BedAnnotationConfig) {
    this.id = config.id;
    this.start = config.start;
    this.end = config.end;
    this.chrom = config.chrom;
    this.name = config.name;
    this.score = config.score;
    this.strand = config.strand;
    this.thickStart = config.thickStart;
    this.thickEnd = config.thickEnd;
    this.itemRgb = config.itemRgb;
    this.blockCount = config.blockCount;
    this.blockSizes = config.blockSizes;
    this.blockStarts = config.blockStarts;
  }
}
