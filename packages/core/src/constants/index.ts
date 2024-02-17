import BigNumber from "bignumber.js";
export * from "./queryKeys";
export const UNIT = BigInt(1000_000_000_000);
export const UNIT_BN = new BigNumber(UNIT.toString());
export const DEFAULT_TRADING_VIEW_INTERVAL = "5";
export const DEFAULTBALANCESINTRONAME = "balancesIntro";
export const DEFAULTWALLETSINTRONAME = "WalletsIntro";

export const POLKADEX_ASSET = {
  name: "POLKADEX",
  ticker: "PDEX",
  id: "PDEX",
  decimal: 12,
};

export const defaultTicker = {
  market: "0-0",
  open: 0,
  close: 0,
  high: 0,
  low: 0,
  baseVolume: 0,
  quoteVolume: 0,
  currentPrice: 0,
  priceChangePercent24Hr: 0,
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
  error: "error",
};

export type UserEvents = keyof typeof USER_EVENTS;

export const ErrorMessages = {
  OCEX_ALREADY_REGISTERED: "ocex.MainAccountAlreadyRegistered: ",

  CHECK_VALID_AMOUNT: "Use a valid amount instead",
  CHECK_BALANCE: "The amount you entered exceeds your balance",
  REMAINING_BALANCE:
    "You need atleast 1 PDEX in your funding account to keep it alive",
  REMAINING_BALANCE_IF_NOT_PDEX:
    "You need atleast 0.00001 units of an asset in your funding account to keep it alive.",
  MAX_DIGIT_AFTER_DECIMAL: "Maximum 6 digits are allowed after decimal",
  WHITESPACE_NOT_ALLOWED: "Whitespace not allowed",
  MUST_BE_A_NUMBER: "Must be a number",
  TOO_SMALL: "Too Small!",
};

export const MAX_DIGITS_AFTER_DECIMAL = 6;
export const MIN_DIGITS_AFTER_DECIMAL = 2;
export const ORDERBOOK_PRECISION = 8;

export const TradingView = {
  lastResolution: "tradingview.chart.lastUsedTimeBasedResolution",
};

export const SUBSCAN_PER_PAGE_LIMIT = 10;
export const TRADE_HISTORY_PER_PAGE_LIMIT = 25;
export const RECENT_TRADES_LIMIT = 30;
export const DEFAULT_BATCH_LIMIT = 15;

export const OTHER_ASSET_EXISTENTIAL = 0.00000001;

export const PALLET_ADDRESS =
  "esoEt6uZ3GuFV8EzKB2EAREe3KE9WuRVfmhK1RRtwffY78ArH";
