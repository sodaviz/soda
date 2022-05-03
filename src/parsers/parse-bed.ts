import { Orientation, parseOrientation } from "../annotations/orientation";
import { generateId } from "../utilities/id-generation";
import { Annotation } from "../annotations/annotation";

/**
 * An interface that describes BED records. For more information, see https://genome.ucsc.edu/FAQ/FAQformat.html#format1
 */
export interface BedAnnotation extends Annotation {
  /**
   * A BED field that describes the chromosome of the record.
   */
  chrom: string;
  /**
   * A BED field that describes the starting position of the record. This is chromStart in the BED spec, but it's
   * start here to fit in better with the rest of SODA.
   */
  start: number;
  /**
   * A BED field that describes the ending position of the record. This is chromEnd in the BED spec, but it's end
   * here to fit in better with the rest of SODA.
   */
  end: number;
  /**
   * A BED field that describes the name of the record.
   */
  name?: string;
  /**
   * A BED field that describes the "score" of the record.
   */
  score?: number;
  /**
   * A BED field that describes the orientation/strand of the record.
   */
  strand?: Orientation;
  /**
   * A BED field that describes at which coordinate the feature should start being drawn "thickly."
   */
  thickStart?: number;
  /**
   * A BED field that describes at which coordinate the feature should stop being drawn "thickly."
   */
  thickEnd?: number;
  /**
   * A BED field BED field that defines the color of the feature. It is an RGB string, e.g. (0, 1,
   * 256).
   */
  itemRgb?: string;
  /**
   * A BED field for records that should be drawn as discontiguous/fragmented glyphs. This describes the number of
   * fragments.
   */
  blockCount?: number;
  /**
   * A BED field for records that should be drawn as discontiguous/fragmented glyphs. This describes the size of each
   * fragment.
   */
  blockSizes?: number[];
  /**
   * A BED field for records that should be drawn as discontiguous/fragmented glyphs. This describes the offset of
   * each fragment.
   */
  blockStarts?: number[];
}
/**
 * A utility function to parse a general BED record. There are no guarantees about which fields end up being present
 * in the resulting BED objects.
 * @param records
 */
export function parseBedRecords(records: string | string[]): BedAnnotation[] {
  if (!Array.isArray(records)) {
    records = records.split("\n");
  }

  let annotations: BedAnnotation[] = [];
  let emptyRegex = /^\s*$/;
  for (const record of records) {
    if (emptyRegex.exec(record)) {
      continue;
    }

    let splitRecord = record.split(/\s+/);

    annotations.push({
      id: generateId("bed-ann"),
      start: parseInt(splitRecord[1]),
      end: parseInt(splitRecord[2]),
      chrom: splitRecord[0],
      name: splitRecord[3],
      score:
        splitRecord[4] != undefined ? parseFloat(splitRecord[4]) : undefined,
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
  return annotations;
}
