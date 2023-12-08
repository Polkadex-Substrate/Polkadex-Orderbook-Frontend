import { LOCAL_STORAGE_ID } from "../constants";
import { Market } from "../utils/orderbookService";

import { setToStorage } from "./storage";

export const getCurrentMarket = (markets: Market[], defaultMarket: string) => {
  if (markets?.length && defaultMarket) {
    const findMarketByName = markets?.find((v) =>
      v.name
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .includes(defaultMarket.toLowerCase())
    );

    const findMarketById = markets?.find((v) => v.id === defaultMarket);

    const defaultMarketSelected =
      findMarketByName ?? findMarketById ?? markets[0];

    setToStorage(LOCAL_STORAGE_ID.DEFAULT_MARKET, defaultMarketSelected.id);

    return defaultMarketSelected;
  }
};
