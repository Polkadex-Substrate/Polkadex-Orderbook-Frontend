export function getNonce(): number {
  return new Date().getTime();
}
