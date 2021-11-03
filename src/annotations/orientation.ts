/**
 * A simple enum to define strand orientation.
 */
export enum Orientation {
  /**
   * Represents the forward strand.
   */
  Forward = "+",
  /**
   * Represents the reverse strand.
   */
  Reverse = "-",
  /**
   * Represents an unknown strand where strand information would be relevant (if it were known).
   */
  Unknown = "?",
  /**
   * Represents no strand.
   */
  Unoriented = ".",
}

/**
 * A utility function to parse an Orientation enum from a string. For now, this is pretty basic and far from robust.
 * @param str The string to parse.
 */
export function parseOrientation(str: string): Orientation {
  if (str == "+") {
    return Orientation.Forward;
  } else if (str == "-") {
    return Orientation.Reverse;
  } else if (str == ".") {
    return Orientation.Unoriented;
  } else {
    return Orientation.Unknown;
  }
}
