import { DefaultConfig } from ".";
export * from "./types";
export * from "./config";

export const defaultConfig: DefaultConfig = {
  influxDBUrl: process.env.INFLUX_DB_URL,
  amqpWsPassword: process.env.RMQ_KEY,
  amqpWsUsername: process.env.RMQ_USERNAME,
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN,
  enclaveUrl: process.env.ENCLAVE_URL,
  apiPath: process.env.API_PATH,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 50,
  defaultTradingViewInterval: 5,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 5,
  alertDisplayTime: 8000,
  msPricesUpdates: 1000,
  maintenanceMode: false,
};
