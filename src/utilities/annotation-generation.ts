import { Annotation } from "../annotations/annotation";
import { SequenceAnnotation } from "../annotations/sequence-annotation";
import { generateId } from "./id-generation";
import { PlotAnnotation } from "../annotations/plot-annotation";

export enum GenerationPattern {
  Sequential = "sequential",
  Random = "random",
}

/**
 * An interface that defines the parameters for a call to the generateAnnotations function.
 */
export interface AnnotationGenerationConfig {
  n: number;
  startY?: number;
  maxY?: number;
  maxX?: number;
  pad?: number;
  width?: number;
  generationPattern?: GenerationPattern;
}

/**
 * A utility function to generate some uniformly distributed Annotation objects. This is intended for
 * testing/prototyping/playing around.
 * @param conf
 */
export function generateAnnotations(
  conf: AnnotationGenerationConfig
): Annotation[] {
  let ann: Annotation[] = [];
  if (
    conf.generationPattern == GenerationPattern.Sequential ||
    conf.generationPattern == undefined
  ) {
    for (let i = 0; i < conf.n; i++) {
      let start = i * ((conf.width || 100) + (conf.pad || 0));
      let end = start + (conf.width || 100);
      ann.push({
        id: generateId("soda-gen-ann"),
        start,
        end,
      });
    }
  } else if (conf.generationPattern == GenerationPattern.Random) {
    for (let i = 0; i < conf.n; i++) {
      let start = randInt(conf.maxX || 1000);
      let end = start + randInt(conf.width || 100);

      ann.push({
        id: generateId("soda-gen-ann"),
        start,
        end,
      });
    }
  }
  return ann;
}

/**
 * @internal
 */
const DNA_ALPHABET = ["A", "C", "T", "G"];

/**
 * A utility function to generate some SequenceAnnotation objects. This is intended for testing/prototyping/playing
 * around.
 * @param conf
 */
export function generateSequenceAnnotations(
  conf: AnnotationGenerationConfig
): SequenceAnnotation[] {
  let ann = generateAnnotations(conf);
  return ann.map((a) => {
    let sequence = "";
    for (let i = 0; i < (conf.width || 100); i++) {
      sequence += DNA_ALPHABET[randInt(4)];
    }
    return {
      ...a,
      sequence,
    };
  });
}

/**
 * A utility function to generate some PlotAnnotation objects. This is intended for testing/prototyping/playing
 * around.
 * @param conf
 */
export function generatePlotAnnotations(
  conf: AnnotationGenerationConfig
): PlotAnnotation[] {
  let ann = generateAnnotations(conf);
  return ann.map((a) => {
    let values = [];
    for (let i = 0; i < (conf.width || 100); i++) {
      values[i] = randInt(100);
    }
    return {
      ...a,
      values,
    };
  });
}

/**
 * @internal
 * @param max
 */
function randInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
