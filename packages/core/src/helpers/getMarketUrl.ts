import { defaultConfig } from "../config";
import { LOCAL_STORAGE_ID } from "../constants";

import { getFromStorage } from "./storage";

export const getMarketUrl = () => {
  const market = getFromStorage(LOCAL_STORAGE_ID.DEFAULT_MARKET);
  const marketName =
    market && isValidJson(market)
      ? JSON.parse(market)?.name
      : defaultConfig.landingPageMarket;
  return `/trading/${marketName}`;
};

export const isValidJson = (e: string) => {
  try {
    JSON.parse(e);
    return true;
  } catch (error) {
    return false;
  }
};
