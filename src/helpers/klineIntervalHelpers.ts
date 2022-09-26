export const getTimeFromResolution = (resolution: string, date: Date) => {
  const resolutionMilliSeconds = getResolutionInMilliSeconds(resolution);
  const bucketTime = Math.floor(date.getTime() / resolutionMilliSeconds);
  return new Date(bucketTime * resolutionMilliSeconds);
};
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
