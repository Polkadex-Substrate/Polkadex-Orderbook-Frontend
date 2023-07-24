import { Amplify, Analytics } from "aws-amplify";

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

console.log("process", process.env.POLKADEX_CHAIN);
export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN,
  gaTrackerKey: process.env.GOOGLE_ANALITYCS_URL,
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
  maintenanceMode: process.env.MAINTENACE_MODE === "true",
  signUpDisabled: process.env.SIGNUP_DISABLED === "true",
  reconnectRangerTime: 30000,
  showShutdownPopup: process.env.SHOW_SHUTDOWN_POPUP === "true",
  availableRoutes: [
    "/trading",
    "/balances",
    "/codeVerification",
    "/createAccount",
    "/deposit",
    "/recovery",
    "/resetPassword",
    "/resetPasswordForm",
    "/settings",
    "/sign",
    "/signIn",
    "/withdraw",
  ],
  underMaintenance: process.env.UNDER_MAINTENACE?.split(","),
  mainUrl: process.env.MAIN_URL || "/trading",
  cmsGraphqlUrl: process.env.CMS_GRAPHQL_URL || "http://127.0.0.1:1337/graphql",
  cmslUrl: process.env.CMS_URL || "http://127.0.0.1:1337",
  cmsBearerToken: process.env.CMS_BEARER_TOKEN,
};
