import { BedAnnotation } from "../annotations/bed-annotation";
import { parseOrientation } from "../annotations/orientation";
import { generateId } from "../utilities/id-generation";

/**
 * A utility function to parse a general BED record. There are no guarantees about which fields end up being present
 * in the resulting BED objects.
 * @param record
 */
export function parseBedRecord(record: string): BedAnnotation {
  let splitRecord = record.split(/\s+/);

  return new BedAnnotation({
    id: generateId("bed-ann"),
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    chrom: splitRecord[0],
    name: splitRecord[3],
    score: splitRecord[4] != undefined ? parseFloat(splitRecord[4]) : undefined,
    strand:
      splitRecord[5] != undefined
        ? parseOrientation(splitRecord[5])
        : undefined,
    thickStart:
      splitRecord[6] != undefined ? parseInt(splitRecord[6]) : undefined,
    thickEnd:
      splitRecord[7] != undefined ? parseInt(splitRecord[7]) : undefined,
    itemRgb: splitRecord[8],
    blockCount:
      splitRecord[9] != undefined ? parseInt(splitRecord[9]) : undefined,
    blockSizes:
      splitRecord[10] != undefined
        ? splitRecord[10].split(",").map((v) => parseInt(v))
        : undefined,
    blockStarts:
      splitRecord[11] != undefined
        ? splitRecord[11].split(",").map((v) => parseInt(v))
        : undefined,
  });
}
