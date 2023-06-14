import BigNumber from "bignumber.js";

export const UNIT = BigInt(1000_000_000_000);
export const UNIT_BN = new BigNumber(UNIT.toString());
export const DEFAULT_TRADING_VIEW_INTERVAL = "5";

export const POLKADEX_ASSET = {
  name: "POLKADEX",
  symbol: "PDEX",
  assetId: "PDEX",
};

export const READ_ONLY_TOKEN = process.env.READ_ONLY_TOKEN || "READ_ONLY";

export const LOCAL_STORAGE_ID = {
  DEFAULT_TRADE_ACCOUNT: "default_trade_account",
  DEFAULT_MARKET: "default_market",
  DEFAULT_AVATAR: "default_avatar",
  DEFAULT_DISCLAIMER: "default_disclaimer",
};

export const USER_EVENTS = {
  // Trade address update for the user
  // send to main address
  AddProxy: "AddProxy",
  RemoveProxy: "RemoveProxy",
  // Register address update for the user
  // send to main address
  RegisterAccount: "RegisterAccount",
  // Order update for the user
  // send to trade address
  Order: "Order",
  // Deposit and withdrawal update for the user
  // send to main address
  SetTransaction: "SetTransaction",
  // balance update for the user
  // send to main address
  SetBalance: "SetBalance",
  // Trade update for the user
  // send to trade address
  TradeFormat: "TradeFormat",
  // Errors from server
  Error: "error",
};

export type UserEvents = keyof typeof USER_EVENTS;

export const ErrorMessages = {
  OCEX_ALREADY_REGISTERED: "ocex.MainAccountAlreadyRegistered: ",
};

export const MAX_DIGITS_AFTER_DECIMAL = 8;
