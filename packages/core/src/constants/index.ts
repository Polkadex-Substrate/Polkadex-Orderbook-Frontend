import BigNumber from "bignumber.js";
export * from "./queryKeys";
export * from "./notifications";
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

export const ErrorMessages = (existential = "0", minAmount = "0") => ({
  OCEX_ALREADY_REGISTERED: "ocex.MainAccountAlreadyRegistered: ",

  CHECK_VALID_AMOUNT: "Use a valid amount instead",
  CHECK_BALANCE: "The amount you entered exceeds your balance",
  REMAINING_BALANCE:
    "You need atleast 1 PDEX in your funding account to keep it alive",
  REMAINING_BALANCE_IF_NOT_PDEX: `You need atleast units of ${existential} an asset in your funding account to keep it alive.`,
  MAX_DIGIT_AFTER_DECIMAL: "Maximum 8 digits are allowed after decimal",
  WHITESPACE_NOT_ALLOWED: "Whitespace not allowed",
  MUST_BE_A_NUMBER: "Must be a number",
  TOO_SMALL: "Too Small!",
  MIN: `Transaction amount must be greater than ${minAmount}`,
});

export const MAX_DIGITS_AFTER_DECIMAL = 8;
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
export const EXISTENTIAL = {
  "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c": {
    // Polkadex
    existential: 1,
    decimals: 18,
    ticker: "PDEX",
  },
  "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f": {
    // Asset Hub
    existential: 0.12,
    decimals: 10,
    ticker: "DOT",
  },
  "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3": {
    // Polkadot
    existential: 1.2,
    decimals: 10,
    ticker: "dOT",
  },
  "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6": {
    // Astar
    existential: Number(Math.pow(10, -4).toFixed(4)),
    decimals: 18,
    ticker: "ASTR",
  },
  "0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736": {
    // Phala
    existential: 0.02,
    decimals: 12,
    ticker: "PHA",
  },
  "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d": {
    // Moonbeam
    existential: 0.1,
    decimals: 18,
    ticker: "GLMR",
  },
  "0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31": {
    // Unique
    existential: 0.01,
    decimals: 18,
    ticker: "UNQ",
  },
  "0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72": {
    // Interlay
    existential: 0.00001,
    decimals: 10,
    ticker: "INTR",
  },
};

export const PALLET_ADDRESS =
  "esoEt6uZ3GuFV8EzKB2EAREe3KE9WuRVfmhK1RRtwffY78ArH";

export const TIME_INTERVAL = {
  // Change it to 201600 for production
  blocksInEpoch: 201600,
  // Change it to 28 days = 28 * 86400 seconds, for production
  epochDuration: 28 * 86400, // in seconds
};

export const START_EPOCH = 1;

export const EVM_TOKENS = ["GLMR"];

export const MINIMUM_PDEX_REQUIRED = 1;
