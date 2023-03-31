import BigNumber from "bignumber.js";

export const UNIT = BigInt(1000_000_000_000);
export const UNIT_BN = new BigNumber(UNIT.toString());
export const DEFAULT_TRADING_VIEW_INTERVAL = "5";

export const POLKADEX_ASSET = {
  name: "POLKADEX",
  symbol: "PDEX",
  asset_id: "PDEX",
};

export const READ_ONLY_TOKEN = process.env.READ_ONLY_TOKEN || "READ_ONLY";

export const LOCAL_STORAGE_ID = {
  DEFAULT_TRADE_ACCOUNT: "default_trade_account",
  DEFAULT_MARKET: "default_market",
  DEFAULT_AVATAR: "default_avatar",
  DEFAULT_DISCLAIMER: "default_disclaimer",
};

export const USER_EVENTS = {
  AddProxy: "AddProxy",
  RegisterAccount: "RegisterAccount",
  Order: "Order",
  SetTransaction: "SetTransaction",
  SetBalance: "SetBalance",
  TradeFormat: "TradeFormat",
  RemoveProxy: "RemoveProxy",
  Error: "error",
};

export const ErrorMessages = {
  OCEX_ALREADY_REGISTERED: "ocex.MainAccountAlreadyRegistered: ",
};
