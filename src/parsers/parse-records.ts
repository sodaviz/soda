import { Annotation } from "../annotations/annotation";

/**
 * A generalized utility function to parse multiple data records from a single string into multiple Annotation objects.
 * @param parseFn A callback function that parses a single record into an Annotation object.
 * @param recordString A single string containing many records.
 * @param recordSeparator A regex that describes how to split the records in the provided string. This defaults to
 * the newline character.
 */
export function parseRecordsFromString<A extends Annotation>(
  parseFn: (record: string) => A,
  recordString: string,
  recordSeparator = /\n/
): A[] {
  let annotations: A[] = [];
  let records = recordString.split(recordSeparator);
  let emptyRegex = /^\s*$/;
  for (const record of records) {
    if (!emptyRegex.exec(record)) {
      annotations.push(parseFn(record));
    }
  }
  return annotations;
}
