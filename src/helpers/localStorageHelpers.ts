import { getFromStorage, setToStorage } from "@polkadex/orderbook/helpers/storage";

export const setIsTradeAccountPassworded = (tradeAddress: string, isPassworded: boolean) => {
  setToStorage(`trading_acc_${tradeAddress}`, isPassworded);
};

export const getIsTradeAccountPasswordProtected = (tradeAddress: string): boolean => {
  return getFromStorage(`trading_acc_${tradeAddress}`)?.toUpperCase() === "TRUE";
};
