import { Amplify } from "aws-amplify";

import awsconfig from "../aws-exports";

import { DefaultConfig } from ".";
export * from "./types";
export * from "./config";

Amplify.configure(awsconfig);

export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN,
  enclaveUrl: process.env.ENCLAVE_URL,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 100,
  defaultTradingViewInterval: 5,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 5,
  alertDisplayTime: 5000,
  msPricesUpdates: 1000,
  maintenanceMode: false,
};
