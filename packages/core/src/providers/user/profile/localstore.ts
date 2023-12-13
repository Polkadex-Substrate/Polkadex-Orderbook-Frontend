import { UserAccount } from "@orderbook/core/providers/user/profile/types";
import {
  ACTIVE_ACCOUNT_KEY,
  AVATAR_KEY,
  FAVORITE_MARKET_KEY,
} from "@orderbook/core/providers/user/profile/constants";

export const setLastUsedAccount = (account: UserAccount) => {
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, JSON.stringify(account));
};

export const getLastUsedAccount = () => {
  const account = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  if (!account) return null;
  return JSON.parse(account);
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
