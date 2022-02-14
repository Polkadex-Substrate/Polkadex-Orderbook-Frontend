export const resolutionForPayload = (resolution: string): string => {
  const isNum = /^[0-9]+$/.test(resolution);
  if (isNum) {
    const resNum = parseInt(resolution);
    if (resNum < 60) {
      return `${resNum}m`;
    }
    return `${resNum / 60}h`;
  }

  return resolution;
};
