import { DEFAULT_TRADING_VIEW_INTERVAL } from "@polkadex/web-constants";

export const periodsMapString: { [pair: number]: string } = {
  1: "1m",
  5: "5m",
  15: "15m",
  30: "30m",
  60: "1h",
  120: "2h",
  240: "4h",
  360: "6h",
  720: "12h",
  1440: "1d",
  4320: "3d",
  10080: "1w",
};

export const periodMinutesToString = (period: number): string =>
  periodsMapString[period] || periodsMapString[+DEFAULT_TRADING_VIEW_INTERVAL];
