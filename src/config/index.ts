import { DefaultConfig } from ".";
export * from "./types";
export * from "./config";

export const defaultConfig: DefaultConfig = {
  polkadotJsWs: process.env.POLKADEX_WS,
  auth: process.env.POLKADEX_HOST_URL,
  engine: `${process.env.HOST_URL}/api/v2/peatio`,
  polkadexHostUrl: `${process.env.POLKADEX_HOST_URL}`,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 50,
  defaultTradingViewInterval: 15,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 5,
  alertDisplayTime: 8000,
  msPricesUpdates: 1000,
  maintenanceMode: false,
};
