import {
  BedAnnotation,
  Bed12Annotation,
  Bed9Annotation,
  Bed6Annotation,
  Bed3Annotation,
} from "../annotations/bed-annotation";
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

/**
 * A utility function to explicitly parse BED3 records. The resulting objects will only have the first three fields
 * of the BED format.
 * @param record
 */
export function parseBed3Record(record: string): Bed3Annotation {
  let splitRecord = record.split(/\s+/);

  if (splitRecord.length < 3) {
    throw "BED3 split length less than 3";
  }

  return new Bed3Annotation({
    id: generateId("bed3-ann"),
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    row: 0,
    chrom: splitRecord[0],
  });
}

/**
 * A utility function to explicitly parse BED6 records. The resulting objects will only have the first six fields
 * of the BED format.
 * @param record
 */
export function parseBed6Record(record: string): Bed6Annotation {
  let splitRecord = record.split(/\s+/);

  if (splitRecord.length < 6) {
    throw "BED6 split length less than 6";
  }

  return new Bed6Annotation({
    id: generateId("bed6-ann"),
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    row: 0,
    chrom: splitRecord[0],
    name: splitRecord[3],
    score: parseFloat(splitRecord[4]),
    strand: parseOrientation(splitRecord[5]),
  });
}

/**
 * A utility function to explicitly parse BED9 records. The resulting objects will only have the first nine fields
 * of the BED format.
 * @param record
 */
export function parseBed9Record(record: string): Bed9Annotation {
  let splitRecord = record.split(/\s+/);

  if (splitRecord.length < 9) {
    throw "BED9 split length less than 9";
  }

  return new Bed9Annotation({
    id: generateId("bed9-ann"),
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    row: 0,
    chrom: splitRecord[0],
    name: splitRecord[3],
    score: parseFloat(splitRecord[4]),
    strand: parseOrientation(splitRecord[5]),
    thickStart: parseInt(splitRecord[6]),
    thickEnd: parseInt(splitRecord[7]),
    itemRgb: splitRecord[8],
  });
}

/**
 * A utility function to explicitly parse BED12 records. The resulting objects will have all twelve fields of the
 * BED format.
 * @param record
 */
export function parseBed12Record(record: string): Bed12Annotation {
  let splitRecord = record.split(/\s+/);

  if (splitRecord.length < 12) {
    throw "BED12 split length less than 12";
  }

  return new Bed12Annotation({
    id: generateId("bed12-ann"),
    start: parseInt(splitRecord[1]),
    end: parseInt(splitRecord[2]),
    row: 0,
    chrom: splitRecord[0],
    name: splitRecord[3],
    score: parseFloat(splitRecord[4]),
    strand: parseOrientation(splitRecord[5]),
    thickStart: parseInt(splitRecord[6]),
    thickEnd: parseInt(splitRecord[7]),
    itemRgb: splitRecord[8],
    blockCount: parseInt(splitRecord[9]),
    blockSizes: splitRecord[10].split(",").map((v) => parseInt(v)),
    blockStarts: splitRecord[11].split(",").map((v) => parseInt(v)),
  });
}
