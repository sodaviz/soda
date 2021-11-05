import { Annotation, AnnotationConfig } from "../annotations/annotation";
import {
  SequenceAnnotation,
  SequenceAnnotationConfig,
} from "../annotations/sequence-annotation";
import { generateId } from "./id-generation";
import {
  PlotAnnotation,
  PlotAnnotationConfig,
} from "../annotations/plot-annotation";

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
 * A helper function that creates some Annotation configs.
 * @internal
 * @param conf
 */
function generateConfigs(conf: AnnotationGenerationConfig): AnnotationConfig[] {
  let confs: AnnotationConfig[] = [];
  if (
    conf.generationPattern == GenerationPattern.Sequential ||
    conf.generationPattern == undefined
  ) {
    for (let i = 0; i < conf.n; i++) {
      confs.push({
        id: generateId("soda-gen-ann"),
        width: conf.width || 100,
        start: i * ((conf.width || 100) + (conf.pad || 0)),
        row: (conf.startY || 0) + (i % (conf.maxY || 2)),
      });
    }
  } else if (conf.generationPattern == GenerationPattern.Random) {
    for (let i = 0; i < conf.n; i++) {
      confs.push({
        id: generateId("soda-gen-ann"),
        width: randInt(conf.width || 100),
        start: randInt(conf.maxX || 1000),
        row: 0,
      });
    }
  }
  return confs;
}

/**
 * A utility function to generate some uniformly distributed Annotation objects. This is intended for
 * testing/prototyping/playing around.
 * @param conf
 */
export function generateAnnotations(
  conf: AnnotationGenerationConfig
): Annotation[] {
  return generateConfigs(conf).map((c) => {
    return new Annotation(c);
  });
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
  let sequenceConf = <SequenceAnnotationConfig[]>generateConfigs(conf);
  return sequenceConf.map((a) => {
    a.sequence = "";
    for (let i = 0; i < (conf.width || 100); i++) {
      a.sequence += DNA_ALPHABET[randInt(4)];
    }
    return new SequenceAnnotation(a);
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
  let sequenceConf = <PlotAnnotationConfig[]>generateConfigs(conf);
  return sequenceConf.map((c) => {
    c.yValues = [];
    for (let i = 0; i < (conf.width || 100); i++) {
      c.yValues[i] = randInt(100);
    }
    return new PlotAnnotation(c);
  });
}

/**
 * @internal
 * @param max
 */
function randInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
