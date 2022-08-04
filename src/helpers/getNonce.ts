export function getNonce(): number {
  return Math.floor(new Date().getTime() / 1000);
}
