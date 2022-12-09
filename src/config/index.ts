import { Amplify, Analytics, Auth } from "aws-amplify";

import awsconfig from "../aws-exports";

import { DefaultConfig } from ".";
export * from "./types";

Amplify.configure(awsconfig);

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: process.env.PIN_POINT_CLIENT_ID,
    // Amazon service region
    region: process.env.API_REGION,
    mandatorySignIn: false,
  },
};

Analytics.configure(analyticsConfig);

export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
  recaptchaV2: process.env.RECAPTCHA_KEY,
  landingPageMarket: process.env.LANDING_PAGE || "PDEXCUSDT",
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 100,
  defaultTradingViewInterval: 5,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 120,
  alertDisplayTime: 5000,
  msPricesUpdates: 1000,
  maintenanceMode: false,
  signUpDisabled: process.env.SIGNUP_DISABLED === "true",
  reconnectRangerTime: 30000,
};
