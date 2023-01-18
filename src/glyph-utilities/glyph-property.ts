import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { AnnotationDatum } from "./bind";
import * as d3 from "d3";
import { GlyphPropertyPolicy } from "./glyph-modifier";

type DemoteGlyphProperties<A extends Annotation, C extends Chart<any>, T> = {
  [prop in keyof T]: T[prop] extends GlyphProperty<A, C, string>
    ? GlyphCallback<A, C, string>
    : T[prop] extends GlyphProperty<A, C, number>
    ? GlyphCallback<A, C, number>
    : T[prop] extends GlyphProperty<A, C, number>
    ? GlyphCallback<A, C, boolean>
    : T[prop];
};

type PromoteGlyphCallbacks<A extends Annotation, C extends Chart<any>, T> = {
  [prop in keyof T]: T[prop] extends GlyphCallback<A, C, string>
    ? GlyphProperty<A, C, string>
    : T[prop] extends GlyphCallback<A, C, number>
    ? GlyphProperty<A, C, number>
    : T[prop] extends GlyphCallback<A, C, number>
    ? GlyphProperty<A, C, boolean>
    : T[prop];
};

/**
 * A type that describes the callback functions used across SODA to define glyph properties dynamically.
 */
export type GlyphCallback<A extends Annotation, C extends Chart<any>, V> = (
  d: AnnotationDatum<A, C>
) => V;

/**
 * A type that is simply the union of GlyphCallback<A, C, V> and the value V that it returns.
 */
export type GlyphProperty<A extends Annotation, C extends Chart<any>, V> =
  | GlyphCallback<A, C, V>
  | V;

/**
 * @internal
 * @param property
 */
export function isGlyphCallback<A extends Annotation, C extends Chart<any>, V>(
  property: GlyphProperty<A, C, V>
): property is GlyphCallback<A, C, V> {
  return typeof property === "function";
}

/**
 * A utility function that turns a GlyphProperty into a GlyphCallback.
 * @internal
 * @param p
 */
export function callbackify<A extends Annotation, C extends Chart<any>, V>(
  p: GlyphProperty<A, C, V>
): GlyphCallback<A, C, V> {
  if (isGlyphCallback(p)) {
    return p;
  } else {
    return () => p;
  }
}

export function callbackifyOrDefault<
  A extends Annotation,
  C extends Chart<any>,
  V
>(
  maybeProperty: GlyphProperty<A, C, V> | undefined,
  defaultProperty: GlyphCallback<A, C, V>
) {
  return maybeProperty != undefined
    ? callbackify(maybeProperty)
    : defaultProperty;
}

/**
 * A utility function that resolves the value from a GlyphProperty. If the property is a callback function, it will
 * be called to retrieve the value. Otherwise, it will just return the value.
 * @param property
 * @param d
 */
export function resolveGlyphProperty<
  A extends Annotation,
  C extends Chart<any>,
  V
>(property: GlyphProperty<A, C, V>, d: AnnotationDatum<A, C>): V {
  if (isGlyphCallback(property)) {
    return property(d);
  }
  return property;
}

export interface PropertyRule<A extends Annotation, C extends Chart<any>> {
  key: string;
  property: GlyphProperty<A, C, number | string | boolean> | undefined;
}

/**
 * This defines the parameters for a call to the applyStyle() and applyAttribute() functions.
 */
export interface PropertyConfig<A extends Annotation, C extends Chart<any>> {
  /**
   * The d3 selection to which the property is applied.
   */
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
  /**
   * The SVG key for the property.
   */
  key: string;
  /**
   * The GlyphProperty that is evaluated to produce a value for the property.
   */
  property: GlyphProperty<A, C, string | number | boolean> | undefined | null;
}

/**
 * A utility function that applies a style to a glyph.
 * @param config
 * @internal
 */
export function applyStyle<A extends Annotation, C extends Chart<any>>(
  config: PropertyConfig<A, C>
): void {
  if (typeof config.property == "function") {
    config.selection.style(config.key, config.property);
  } else if (config.property != undefined) {
    config.selection.style(config.key, config.property);
  } else if (config.property === null) {
    config.selection.style(config.key, config.property);
  }
}

/**
 * A utility function that applies an attribute to a glyph.
 * @param config
 * @internal
 */
export function applyAttribute<A extends Annotation, C extends Chart<any>>(
  config: PropertyConfig<A, C>
): void {
  // This is really annoying... the D3 typedefs define .attr() as a function with several overloads rather than a
  // function that takes union type parameters. I have to perform this type check to overcome the TypeScript
  // compiler's inability to figure out that it is perfectly acceptable for an overloaded function to accept the
  // union of all of the types in each overload signature.
  if (typeof config.property == "function") {
    config.selection.attr(config.key, config.property);
  } else if (config.property != undefined) {
    config.selection.attr(config.key, config.property);
  } else if (config.property === null) {
    config.selection.attr(config.key, config.property);
  }
}

export interface PolicyApplicationConfig<
  A extends Annotation,
  C extends Chart<any>
> {
  selectionKeys: string[];
  selectionMap: Map<string, d3.Selection<any, AnnotationDatum<A, C>, any, any>>;
  policy: GlyphPropertyPolicy<A, C>;
  context: string;
}

export function applyPropertyPolicy<A extends Annotation, C extends Chart<any>>(
  config: PolicyApplicationConfig<A, C>
) {
  for (const key of config.selectionKeys) {
    let selection = config.selectionMap.get(key);
    if (selection == undefined) {
      console.error(
        "undefined selection:",
        key,
        "in call to applyPropertyPolicy"
      );
      continue;
    }

    let stylePolicy = config.policy.styleRuleMap.get(key);
    if (stylePolicy != undefined) {
      for (const rule of stylePolicy) {
        applyStyle({ selection, ...rule });
      }
    }

    let attributePolicy = config.policy.attributeRuleMap.get(key);
    if (attributePolicy != undefined) {
      for (const rule of attributePolicy) {
        applyAttribute({ selection, ...rule });
      }
    }
  }
}
