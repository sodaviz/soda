import { BedAnnotation } from "../annotations/bed-annotation";
import { parseOrientation } from "../annotations/orientation";

export function parseBedRecords(records: string): BedAnnotation[] {
  let annotations: BedAnnotation[] = [];
  let recordLines = records.split("\n");
  for (const record of recordLines) {
    annotations.push(parseBedRecord(record));
  }
  return annotations;
}

export function parseBedRecord(record: string): BedAnnotation {
  let splitRecord = record.split(/\s+/);

  return new BedAnnotation({
    id: "",
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    row: 0,
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
