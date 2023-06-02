export const getAbsoluteResolution = (currentResolution: string) => {
  const getCorrectResolutions = {
    "1": "1m",
    "5": "5m",
    "15": "15m",
    "30": "30m",
    "60": "1h",
    "360": "6h",
  };
  return getCorrectResolutions[currentResolution] || currentResolution;
};
