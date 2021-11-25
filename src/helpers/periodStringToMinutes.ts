import { DEFAULT_TRADING_VIEW_INTERVAL } from "@polkadex/web-constants";

export const periodsMapNumber: { [pair: string]: number } = {
  "1m": 1,
  "5m": 5,
  "15m": 15,
  "30m": 30,
  "1h": 60,
  "2h": 120,
  "4h": 240,
  "6h": 360,
  "12h": 720,
  "1d": 1440,
  "3d": 4320,
  "1w": 10080,
};

export const periodStringToMinutes = (period: string): number =>
  periodsMapNumber[period] || +DEFAULT_TRADING_VIEW_INTERVAL;
