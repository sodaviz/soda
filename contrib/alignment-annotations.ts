import { SequenceAnnotation } from "../src";

let blank = "\u2000";

/**
 * This defines the parameters for a call to the getAlignmentAnnotations() function.
 */
export interface AlignmentConfig {
  id: string;
  target: string;
  query: string;
  start: number;
  end?: number;
  row: number;
}

/**
 * The return type for the getAlignmentAnnotations() function.
 */
export interface AlignmentAnnotations {
  matches: SequenceAnnotation;
  substitutions: SequenceAnnotation;
  gaps: SequenceAnnotation;
  insertions: SequenceAnnotation[];
}

/**
 * This returns a set of SequenceAnnotations defined such that the provided query sequence can be rendered in a
 * Chart as if it were aligned to a chromosome. The matches, substitutions, gaps, and insertions are returned as
 * separate objects. The idea here is that they can be rendered individually with different style parameters.
 * @param config
 */
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

  let matchesJoined = matches.join("");
  let substitutionsJoined = substitutions.join("");
  let gapsJoined = gaps.join("");
  let end = config.end || config.start + matchesJoined.length;
  let i = 0;
  let alignments: AlignmentAnnotations = {
    matches: new SequenceAnnotation({
      id: config.id + "-matches",
      start: config.start,
      end: end,
      row: config.row,
      sequence: matchesJoined,
    }),
    substitutions: new SequenceAnnotation({
      id: config.id + "-substitutions",
      start: config.start,
      end: end,
      row: config.row,
      sequence: substitutionsJoined,
    }),
    gaps: new SequenceAnnotation({
      id: config.id + "-gaps",
      start: config.start,
      end: end,
      row: config.row,
      sequence: gapsJoined,
    }),
    insertions: insertions.map((insert) => {
      let start = config.start + insert[0] - 0.5;
      return new SequenceAnnotation({
        id: config.id + `-insertion-${i++}`,
        start,
        end: start + insert[1],
        row: config.row,
        sequence: querySplit.splice(insert[0], insert[1]).join(""),
      });
    }),
  };
  return alignments;
}
