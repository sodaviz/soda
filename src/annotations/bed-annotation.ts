import { Annotation, AnnotationConfig } from "./annotation";
import { Orientation } from "./orientation";

/**
 * A simple interface that holds the arguments for a BedAnnotation constructor.
 */
export interface BedAnnotationConfig extends AnnotationConfig {
  /**
   * A BED3 field that describes the chromosome of the record.
   */
  chrom: string;
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
   * A BED9 field BED field that defines the color of the feature. It is an RGB string, ie. (<0-256>, <0-256>, <0-256>).
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

export type Bed3Annotation = Omit<
  BedAnnotation,
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

export type Bed6Annotation = {
  name: string;
  score: number;
  strand: Orientation;
} & Omit<
  BedAnnotation,
  | "thickStart"
  | "thickEnd"
  | "itemRgb"
  | "blockCount"
  | "blockSizes"
  | "blockStarts"
>;

export type Bed9Annotation = {
  name: string;
  score: number;
  strand: Orientation;
  thickStart: number;
  thickEnd: number;
  itemRgb: string;
} & Omit<BedAnnotation, "blockCount" | "blockSizes" | "blockStarts">;

export type Bed12Annotation = {
  name: string;
  score: number;
  strand: Orientation;
  thickStart: number;
  thickEnd: number;
  itemRgb: string;
  blockCount: number;
  blockSizes: number[];
  blockStarts: number[];
} & BedAnnotation;

/**
 * An Annotation definition for BED records. For more information on BED records, see
 * https://genome.ucsc.edu/FAQ/FAQformat.html#format1.
 */
export class BedAnnotation extends Annotation {
  /**
   * A BED3 field that describes the chromosome of the record.
   */
  chrom: string;
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
   * A BED9 field BED field that defines the color of the feature. It is an RGB string, ie. (<0-256>, <0-256>, <0-256>).
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

  constructor(config: BedAnnotationConfig) {
    super(config);
    this.chrom = config.chrom;
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
