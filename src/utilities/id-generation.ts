const DEFAULT_PREFIX = "soda-id";

let prefixToCount: Map<string, number> = new Map();
prefixToCount.set(DEFAULT_PREFIX, 0);

/**
 * Get an auto-generated string identifier of the form "<prefix>-<count>," where prefix defaults to "soda-id" and
 * count is incremented for every call to this function. A unique count is maintained for each prefix.
 * @param prefix The optional prefix (defaults to "soda-id").
 */
export function generateId(prefix?: string): string {
  prefix = prefix || DEFAULT_PREFIX;
  let count = prefixToCount.get(prefix) || 0;
  let id = `${prefix}-${count}`;
  count++;
  prefixToCount.set(prefix, count);
  return id;
}
