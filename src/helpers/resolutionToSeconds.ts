export const resolutionToSeconds = (r: string): number => {
  const minutes = parseInt(r, 10);
  if (r === "1D") {
    return 1440;
  } else if (r === "D") {
    return 4320;
  } else if (!isNaN(minutes)) {
    return minutes;
  } else {
    return 1;
  }
};
