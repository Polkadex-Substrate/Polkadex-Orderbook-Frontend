import { Amplify } from "aws-amplify";

import awsconfig from "../aws-exports";

import { DefaultConfig } from ".";
export * from "./types";

Amplify.configure(awsconfig);

export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
  landingPageMarket: "PDEXTDOT",
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
