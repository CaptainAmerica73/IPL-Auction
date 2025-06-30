export function toCrore(value: string): string {
  let parts = value.split(".");
  if (parts.length > 2) parts = parts.slice(0, 2);
  if (parts.length === 2 && parts[1].length > 2)
    parts[1] = parts[1].slice(0, 2);
  return parts.join(".");
}
