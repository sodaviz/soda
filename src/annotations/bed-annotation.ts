import { Annotation, AnnotationConfig } from "./annotation";
import { Orientation } from "./orientation";

/**
 * @internal
 */
export interface Bed3Record {
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
}

/**
 * A type that defines the parameters to initialize a Bed3Annotation.
 */
export type Bed3AnnotationConfig = Bed3Record & AnnotationConfig;

/**
 * @internal
 */
export interface Bed3Annotation extends Bed3Record {}

/**
 * An annotation object to represent BED annotations explicitly constrained in the BED3 format.
 */
export class Bed3Annotation extends Annotation {
  constructor(config: Bed3AnnotationConfig) {
    super(config);
    this.chrom = config.chrom;
  }
}

/**
 * @internal
 */
export interface Bed6Record extends Bed3Record {
  /**
   * A BED6 field that describes the name of the record.
   */
  name: string;
  /**
   * A BED6 field that describes the "score" of the record.
   */
  score: number;
  /**
   * A BED6 field that describes the orientation/strand of the record.
   */
  strand: Orientation;
}

/**
 * A type that defines the parameters to initialize a Bed6Annotation.
 */
export type Bed6AnnotationConfig = Bed6Record & AnnotationConfig;

/**
 * @internal
 */
export interface Bed6Annotation extends Bed6Record {}

/**
 * An annotation object to represent BED annotations explicitly constrained in the BED6 format.
 */
export class Bed6Annotation extends Bed3Annotation {
  constructor(config: Bed6AnnotationConfig) {
    super(config);
    this.name = config.name;
    this.score = config.score;
    this.strand = config.strand;
  }
}

/**
 * @internal
 */
export interface Bed9Record extends Bed6Record {
  /**
   * A BED9 field that describes at which coordinate the feature should start being drawn "thickly."
   */
  thickStart: number;
  /**
   * A BED9 field that describes at which coordinate the feature should stop being drawn "thickly."
   */
  thickEnd: number;
  /**
   * A BED9 field BED field that defines the color of the feature. It is an RGB string, e.g. (0, 1,
   * 256).
   */
  itemRgb: string;
}

/**
 * A type that defines the parameters to initialize a Bed9Annotation.
 */
export type Bed9AnnotationConfig = Bed9Record & AnnotationConfig;

/**
 * @internal
 */
export interface Bed9Annotation extends Bed9Record {}

/**
 * An annotation object to represent BED annotations explicitly constrained in the BED9 format.
 */
export class Bed9Annotation extends Bed6Annotation {
  constructor(config: Bed9AnnotationConfig) {
    super(config);
    this.thickStart = config.thickStart;
    this.thickEnd = config.thickEnd;
    this.itemRgb = config.itemRgb;
  }
}

/**
 * @internal
 */
export interface Bed12Record extends Bed9Record {
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the number of
   * fragments.
   */
  blockCount: number;
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the size of each
   * fragment.
   */
  blockSizes: number[];
  /**
   * A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the offset of
   * each fragment.
   */
  blockStarts: number[];
}

/**
 * A type that defines the parameters to initialize a Bed12Annotation.
 */
export type Bed12AnnotationConfig = Bed12Record & AnnotationConfig;

/**
 * @internal
 */
export interface Bed12Annotation extends Bed12Record {}

/**
 * An annotation object to represent BED annotations explicitly constrained in the BED12 format.
 */
export class Bed12Annotation extends Bed9Annotation {
  constructor(config: Bed12AnnotationConfig) {
    super(config);
    this.blockCount = config.blockCount;
    this.blockSizes = config.blockSizes;
    this.blockStarts = config.blockStarts;
  }
}

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
export type BedAnnotationConfig = AnnotationConfig & BedRecord;

/**
 * @internal
 */
export interface BedAnnotation extends BedRecord {}

/**
 * An Annotation definition for any BED records. Any fields up through BED12 are supported by this class, but
 * nothing beyond the BED3 fields are guaranteed to be defined. For more information on BED records, see
 * https://genome.ucsc.edu/FAQ/FAQformat.html#format1.
 */
export class BedAnnotation extends Annotation {
  constructor(config: BedAnnotationConfig) {
    super(config);
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
