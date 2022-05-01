import { generateId } from "../utilities/id-generation";
import { Orientation, parseOrientation } from "../annotations/orientation";
import { Annotation } from "../annotations/annotation";

/**
 * An interface that describes the fields in a GFF3 record. For more information see http://gmod.org/wiki/GFF3/
 */
export interface Gff3Annotation extends Annotation {
  /**
   * A GFF3 field: "The ID of the landmark used to establish the coordinate system for the current feature..."
   */
  seqid?: string;
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
   * A GFF3 field that is essentially an anything goes set of key value pairs describing anything
   * anybody every wants to add to a GFF3 record.
   */
  attributes?: Map<string, string>;
}

/**
 * A utility function to parse a GFF3 records. This function accepts either a string of newline delimited GFF3
 * records, or an array of individual record strings.
 * @param records
 */
export function parseGff3Records(records: string | string[]): Gff3Annotation[] {
  if (!Array.isArray(records)) {
    records = records.split("\n");
  }

  let annotations: Gff3Annotation[] = [];
  let emptyRegex = /^\s*$/;
  for (const record of records) {
    if (emptyRegex.exec(record)) {
      continue;
    }

    let splitRecord = record.split("\t");

    if (splitRecord.length < 9) {
      console.warn("GFF3 split length less than 9");
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
    annotations.push({
      id: id || generateId("gff3-annotation"),
      start:
        splitRecord[3] != undefined && splitRecord[0] != "."
          ? parseInt(splitRecord[3])
          : 0,
      end:
        splitRecord[4] != undefined && splitRecord[4] != "."
          ? parseInt(splitRecord[4])
          : 0,
      seqid: splitRecord[0] != "." ? splitRecord[0] : undefined,
      source: splitRecord[1] != "." ? splitRecord[1] : undefined,
      type: splitRecord[2] != "." ? splitRecord[2] : undefined,
      score:
        splitRecord[5] != undefined && splitRecord[5] != "."
          ? parseFloat(splitRecord[5])
          : undefined,
      strand:
        splitRecord[6] != undefined && splitRecord[6] != "."
          ? parseOrientation(splitRecord[6])
          : undefined,
      phase:
        splitRecord[7] != undefined && splitRecord[7] != "."
          ? parsePhase(splitRecord[7])
          : undefined,
      attributes,
    });
  }

  return annotations;
}

/**
 * @internal
 * @param phase
 */
function parsePhase(phase: string): 1 | 2 | 3 | undefined {
  let value = parseInt(phase);
  if (value == 1 || value == 2 || value == 3) {
    return value;
  }
  return undefined;
}
