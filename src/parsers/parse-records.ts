import { Annotation } from "../annotations/annotation";

export function parseRecordsFromString<A extends Annotation>(
  parseFn: (record: string) => A,
  recordString: string,
  recordSeparator = /\n/
): A[] {
  let annotations: A[] = [];
  let records = recordString.split(recordSeparator);
  for (const record of records) {
    annotations.push(parseFn(record));
  }
  return annotations;
}
