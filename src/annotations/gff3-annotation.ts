import { Annotation, AnnotationConfig } from "./annotation";
import { Orientation } from "./orientation";

export interface Gff3Record {
  seqid?: string;
  source?: string;
  type?: string;
  score?: number;
  strand?: Orientation;
  phase?: 1 | 2 | 3;
  attributes?: Map<string, string>;
}

export interface Gff3AnnotationConfig extends Gff3Record, AnnotationConfig {}

export interface Gff3Annotation extends Gff3Record {}
export class Gff3Annotation extends Annotation {
  constructor(config: Gff3AnnotationConfig) {
    super(config);
    this.seqid = config.seqid;
    this.source = config.source;
    this.type = config.type;
    this.score = config.score;
    this.strand = config.strand;
    this.phase = config.phase;
    this.attributes = config.attributes;
  }
}
