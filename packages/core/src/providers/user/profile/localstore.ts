import { UserAddressTuple } from "@orderbook/core/providers/user/profile/types";
import {
  ACTIVE_ACCOUNT_KEY,
  AVATAR_KEY,
  FAVORITE_MARKET_KEY,
} from "@orderbook/core/providers/user/profile/constants";
import { isValidAddressAddress } from "@orderbook/core/helpers";

export const setLastUsedAccount = (account: UserAddressTuple) => {
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, JSON.stringify(account));
};

export const getLastUsedAccount = () => {
  const account = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  if (!account) return null;
  const accounts: UserAddressTuple = JSON.parse(account);
  return {
    tradeAddress: isValidAddressAddress(accounts.tradeAddress)
      ? accounts.tradeAddress
      : "",
    mainAddress: isValidAddressAddress(accounts.mainAddress)
      ? accounts.mainAddress
      : "",
  };
};

export const setFavoriteMarkets = (markets: string[]) => {
  localStorage.setItem(FAVORITE_MARKET_KEY, JSON.stringify(markets));
};

export const getFavoriteMarkets = () => {
  const markets = localStorage.getItem(FAVORITE_MARKET_KEY);
  if (!markets) return [];
  return JSON.parse(markets);
};

export const setAvatar = (avatar: string) => {
  localStorage.setItem(AVATAR_KEY, avatar);
};

export const getAvatar = () => {
  return localStorage.getItem(AVATAR_KEY);
};
