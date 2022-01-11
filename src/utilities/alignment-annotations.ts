import { SequenceAnnotation } from "../annotations/sequence-annotation";

let blank = "\u2000";

export interface AlignmentConfig {
  target: string;
  query: string;
  start: number;
  end: number;
}

export interface AlignmentAnnotations {
  matches: SequenceAnnotation;
  substitutions: SequenceAnnotation;
  gaps: SequenceAnnotation;
  insertions: SequenceAnnotation[];
}

export function getAlignmentAnnotations(config: AlignmentConfig) {
  let targetSplit = config.target.split("");
  let querySplit = config.query.split("");

  let matches: string[] = [];
  let substitutions: string[] = [];
  let gaps: string[] = [];

  let insertions: [number, number][] = [];
  let inInsert = false;
  let insertStart = 0;
  let insertTotal = 0;
  let insertLength = 0;

  for (let i = 0; i < targetSplit.length; i++) {
    let targetChar = targetSplit[i];
    let queryChar = querySplit[i];

    if (targetChar == "-" || targetChar == ".") {
      if (!inInsert) {
        inInsert = true;
        insertStart = i;
      }
    } else {
      if (targetChar == queryChar) {
        matches.push(queryChar);
        substitutions.push(blank);
        gaps.push(blank);
      } else if (queryChar == "-" || queryChar == ".") {
        matches.push(blank);
        substitutions.push(blank);
        gaps.push(queryChar);
      } else {
        matches.push(blank);
        substitutions.push(queryChar);
        gaps.push(blank);
      }

      if (inInsert) {
        insertLength = i - insertStart;
        insertions.push([insertStart - insertTotal, insertLength]);
        insertTotal += insertLength;
        inInsert = false;
      }
    }
  }

  let alignments: AlignmentAnnotations = {
    matches: new SequenceAnnotation({
      start: config.start,
      end: config.end,
      sequence: matches.join(""),
    }),
    substitutions: new SequenceAnnotation({
      start: config.start,
      end: config.end,
      sequence: substitutions.join(""),
    }),
    gaps: new SequenceAnnotation({
      start: config.start,
      end: config.end,
      sequence: gaps.join(""),
    }),
    insertions: insertions.map((insert) => {
      let start = config.start + insert[0] - 0.5;
      return new SequenceAnnotation({
        start,
        end: start + insert[1],
        sequence: querySplit.splice(insert[0], insert[1]).join(""),
      });
    }),
  };
  return alignments;
}
