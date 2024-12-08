export function normalizePattern(pattern: string): string {
  return pattern.startsWith("^") ? pattern : `^${pattern}`;
}
