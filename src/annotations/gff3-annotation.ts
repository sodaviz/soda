import { Annotation } from "./annotation";
import { Orientation } from "./orientation";
import { generateId } from "../utilities";

/**
 * An interface that describes the fields in a GFF3 record. For more information see http://gmod.org/wiki/GFF3/
 */
export interface Gff3Record {
  id: string;
  /**
   * A GFF3 field: "The ID of the landmark used to establish the coordinate system for the current feature..."
   */
  seqid?: string;
  start: number;
  end: number;
  /**
   * A GFF3 field: "The source is a free text qualifier intended to describe the algorithm or operating procedure that
   * generated this feature..."
   */
  source?: string;
  /**
   * A GFF3 field that is supposed to be "constrained to be either: (a) a term from the "lite" sequence ontology,
   * SOFA; or (b) a SOFA accession number." However, this is currently not enforced by SODA.
   */
  type?: string;
  /**
   * A GFF3 field that should describe the score of the annotation.
   */
  score?: number;
  /**
   * A GFF3 field that describes the strand of the annotation.
   */
  strand?: Orientation;
  /**
   * A GFF3 field that describes the phase for CDS (coding sequence) annotations.
   */
  phase?: 1 | 2 | 3;
  /**
   * A horrifying GFF3 field that is essentially an anything goes set of key value pairs describing anything
   * anybody every wants to add to a GFF3 record.
   */
  attributes?: Map<string, string>;
}

/**
 * An interface that defines the initialization parameters for a Gff3Annotation.
 */
export interface Gff3AnnotationConfig extends Gff3Record {}

/**
 * An interface that serves to easily let the Gff3Annotation class inherit the properties in Gff3AnnotationConfig via
 * declaration merging. See https://www.typescriptlang.org/docs/handbook/declaration-merging.html for more info.
 * @internal
 */
export interface Gff3Annotation extends Gff3Record {}

/**
 * An Annotation class for storing GFF3 records. For more information see http://gmod.org/wiki/GFF3/
 */
export class Gff3Annotation implements Annotation {
  id: string;
  constructor(config: Gff3AnnotationConfig) {
    this.id = config.id;
    this.start = config.start;
    this.end = config.end;
    this.seqid = config.seqid;
    this.source = config.source;
    this.type = config.type;
    this.score = config.score;
    this.strand = config.strand;
    this.phase = config.phase;
    this.attributes = config.attributes;
  }
}
