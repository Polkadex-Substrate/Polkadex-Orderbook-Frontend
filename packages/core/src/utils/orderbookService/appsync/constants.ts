import { Asset } from "@orderbook/core/utils/orderbookService";

export const KlineIntervals = [
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "7d",
  "1M",
  "1w",
];

export const unknownAsset: Asset = {
  id: "unknown",
  ticker: "unknown",
  name: "unknown",
  decimal: 12,
};
