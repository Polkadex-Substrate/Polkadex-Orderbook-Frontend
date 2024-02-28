export const getResolutionInMilliSeconds = (resolution: string): number => {
  const msPerMin = 60000;
  switch (resolution) {
    case "1m":
      return msPerMin;
    case "5m":
      return msPerMin * 5;
    case "15m":
      return msPerMin * 15;
    case "30m":
      return msPerMin * 30;
    case "1h":
    case "1H":
      return msPerMin * 60;
    case "2h":
    case "2H":
      return msPerMin * 2 * 60;
    case "6h":
    case "6H":
      return msPerMin * 6 * 60;
    case "1d":
    case "1D":
      return msPerMin * 24 * 60;
    case "1w":
    case "1W":
      return msPerMin * 7 * 24 * 60;
    default:
      return 1;
  }
};

export const getAbsoluteResolution = (currentResolution: string): string => {
  switch (currentResolution) {
    case "1":
      return "1m";
    case "5":
      return "5m";
    case "15":
      return "15m";
    case "30":
      return "30m";
    case "60":
      return "1h";
    case "120":
      return "2h";
    case "360":
      return "6h";
    default:
      return currentResolution;
  }
};
