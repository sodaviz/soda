import { Annotation, AnnotationConfig } from "./annotation";
import { Orientation } from "./orientation";

export type Bed3Record = Omit<
  BedRecord,
  | "name"
  | "score"
  | "strand"
  | "thickStart"
  | "thickEnd"
  | "itemRgb"
  | "blockCount"
  | "blockSizes"
  | "blockStarts"
>;

export type Bed3AnnotationConfig = Bed3Record & AnnotationConfig;
export interface Bed3Annotation extends Bed3Record {}
export class Bed3Annotation extends Annotation {
  constructor(config: Bed3AnnotationConfig) {
    super(config);
    this.chrom = config.chrom;
  }
}

export type Bed6Record = Bed3Record & {
  name: string;
  score: number;
  strand: Orientation;
};

export type Bed6AnnotationConfig = Bed6Record & AnnotationConfig;
export interface Bed6Annotation extends Bed6Record {}
export class Bed6Annotation extends Bed3Annotation {
  constructor(config: Bed6AnnotationConfig) {
    super(config);
    this.name = config.name;
    this.score = config.score;
    this.strand = config.strand;
  }
}

export type Bed9Record = Bed6Record & {
  thickStart: number;
  thickEnd: number;
  itemRgb: string;
};

export type Bed9AnnotationConfig = Bed9Record & AnnotationConfig;
export interface Bed9Annotation extends Bed9Record {}
export class Bed9Annotation extends Bed6Annotation {
  constructor(config: Bed9AnnotationConfig) {
    super(config);
    this.thickStart = config.thickStart;
    this.thickEnd = config.thickEnd;
    this.itemRgb = config.itemRgb;
  }
}

/**
 * A type that describes BED12 records.
 */
export type Bed12Record = Bed9Record & {
  blockCount: number;
  blockSizes: number[];
  blockStarts: number[];
};

export type Bed12AnnotationConfig = Bed12Record & AnnotationConfig;
export interface Bed12Annotation extends Bed12Record {}

export class Bed12Annotation extends Bed9Annotation {
  constructor(config: Bed12AnnotationConfig) {
    super(config);
    this.blockCount = config.blockCount;
    this.blockSizes = config.blockSizes;
    this.blockStarts = config.blockStarts;
  }
}

/**
 * An interface that describes BED records.
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
   * A BED9 field BED field that defines the color of the feature. It is an RGB string, ie. (<0-256>, <0-256>,
   * <0-256>).
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

export type BedAnnotationConfig = AnnotationConfig & BedRecord;
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
