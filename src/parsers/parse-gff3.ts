import { Gff3Annotation } from "../annotations/gff3-annotation";
import { generateId } from "../utilities/id-generation";
import { Orientation, parseOrientation } from "../annotations/orientation";

export function parseGff3Record(record: string): Gff3Annotation {
  let splitRecord = record.split("\t");

  if (splitRecord.length < 9) {
    throw "GFF3 split length less than 9";
  }

  let seqid: string | undefined;
  if (splitRecord[0] != ".") {
    seqid = splitRecord[0];
  }

  let source: string | undefined;
  if (splitRecord[0] != ".") {
    source = splitRecord[1];
  }

  let type: string | undefined;
  if (splitRecord[0] != ".") {
    type = splitRecord[2];
  }

  let start: number | undefined;
  if (splitRecord[0] != ".") {
    start = parseInt(splitRecord[3]);
  }

  let end: number | undefined;
  if (splitRecord[0] != ".") {
    end = parseInt(splitRecord[4]);
  }

  let score: number | undefined;
  if (splitRecord[0] != ".") {
    score = parseFloat(splitRecord[5]);
  }

  let strand: Orientation | undefined;
  if (splitRecord[0] != ".") {
    strand = parseOrientation(splitRecord[6]);
  }

  let phase: 1 | 2 | 3 | undefined;
  if (splitRecord[0] != ".") {
    let phaseParsed = parseInt(splitRecord[7]);
    if (phaseParsed == (1 | 2 | 3)) {
      phase = <1 | 2 | 3>phaseParsed;
    }
  }

  let attributes: Map<string, string> | undefined;
  let id: string | undefined;
  if (splitRecord[8] != ".") {
    attributes = new Map();
    let attributeSplit = splitRecord[8].split(";");
    for (const attribute of attributeSplit) {
      let pairSplit = attribute.split("=");
      attributes.set(pairSplit[0], pairSplit[1]);
    }
    id = attributes.get("ID");
  }

  return new Gff3Annotation({
    id: id || generateId("gff3-ann"),
    start,
    end,
    row: 0,
    seqid,
    source,
    type,
    score,
    strand,
    phase,
    attributes,
  });
}
