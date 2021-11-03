import { Annotation } from "../annotations/annotation";

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
