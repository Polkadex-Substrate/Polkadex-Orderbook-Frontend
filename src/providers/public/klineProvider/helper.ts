export const getAbsoluteResolution = (currentResolution: string) => {
  const getCorrectResolutions = {
    "1": "1m",
    "5": "5m",
    "15": "15m",
    "30": "30m",
    "60": "1h",
    "360": "6h",
  };
  let resolution: string = currentResolution;
  if (getCorrectResolutions[currentResolution] !== undefined) {
    resolution = getCorrectResolutions[currentResolution];
  }
  return resolution;
};
