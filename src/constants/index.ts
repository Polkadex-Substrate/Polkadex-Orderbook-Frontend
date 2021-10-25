import { AbilitiesInterface } from "src/modules";
import { CanCan } from "src/ui/templates/CanCan";

export const PG_TITLE_PREFIX = "Polkadex";

export const pgRoutes = (
  isLoggedIn: boolean,
  abilities: AbilitiesInterface,
  isLight?: boolean
): string[][] => {
  const routes = [
    ["page.header.navbar.trade", "/trading/", `trade${isLight ? "Light" : ""}`],
    CanCan.checkAbilityByAction("read", "QuickExchange", abilities) && [
      "page.header.navbar.quick.exchange",
      "/quick-exchange",
      `quick_exchange${isLight ? "Light" : ""}`,
    ],
    ["page.header.navbar.wallets", "/wallets", `wallets${isLight ? "Light" : ""}`],
    ["page.header.navbar.openOrders", "/orders", `orders${isLight ? "Light" : ""}`],
    ["page.header.navbar.history", "/history", `history${isLight ? "Light" : ""}`],
    CanCan.checkAbilityByAction("read", "P2P", abilities) && [
      "page.header.navbar.p2p",
      "/p2p",
      `p2p${isLight ? "Light" : ""}`,
    ],
    ["page.header.navbar.api", "/docs", `api${isLight ? "Light" : ""}`],
    [
      "page.header.navbar.internal.transfer",
      "/internal-transfer",
      `internal_transfer${isLight ? "Light" : ""}`,
    ],
  ];

  const routesUnloggedIn = [
    ["page.header.navbar.signIn", "/signin", `signin${isLight ? "Light" : ""}`],
    ["page.header.signUp", "/signup", `signup${isLight ? "Light" : ""}`],
    ["page.header.navbar.trade", "/trading/", `trade${isLight ? "Light" : ""}`],
  ];

  return isLoggedIn ? routes.filter((i) => Boolean(i)) : routesUnloggedIn;
};

export const DEFAULT_CCY_PRECISION = 4;
export const DEFAULT_FIAT_PRECISION = 2;
export const DEFAULT_TRADING_VIEW_INTERVAL = "15";
export const VALUATION_PRIMARY_CURRENCY = "USD";
export const VALUATION_SECONDARY_CURRENCY = "ETH";

export const PASSWORD_ENTROPY_STEP = 6;

export const DEFAULT_KYC_STEPS = ["email", "phone", "profile", "document", "address"];

export const DEFAULT_MARKET_HEADERS = ["Pair", "Price", "24h Change"];

export const TRANSFER_TYPES_LIST = ["Spot", "P2P"];

export const DEFAULT_ORDER_TYPES = ["Limit", "Market"];
export const AMOUNT_PERCENTAGE_ARRAY = [0.25, 0.5, 0.75, 1];
export const DEFAULT_TABLE_PAGE_LIMIT = 25;

export const P2P_TIME_LIMIT_LIST = ["15 min", "30 min", "60 min"];

export const DEFAULT_MARKET = {
  id: "",
  name: "",
  base_unit: "",
  quote_unit: "",
  min_price: "",
  max_price: 0,
  min_amount: 0,
  amount_precision: 0,
  price_precision: 0,
};

export const colors = {
  light: {
    chart: {
      primary: "#fff",
      up: "#54B489",
      down: "#E85E59",
    },
    navbar: {
      sun: "var(--icons)",
      moon: "var(--primary-text-color)",
    },
    orderBook: {
      asks: "var(--asks-level-4)",
      bids: "var(--bids-level-4)",
    },
    depth: {
      fillAreaAsk: "#fa5252",
      fillAreaBid: "#12b886",
      gridBackgroundStart: "#1a243b",
      gridBackgroundEnd: "#1a243b",
      strokeAreaAsk: "#fa5252",
      strokeAreaBid: "#12b886",
      strokeGrid: "#B8E9F5",
      strokeAxis: "#cccccc",
    },
  },
  dark: {
    chart: {
      primary: "#F9FBFC",
      up: "#E6007A",
      down: "#0CA564",
    },
    navbar: {
      sun: "#ffffff",
      moon: "#000000",
    },
    orderBook: {
      asks: "#E6007A",
      bids: "#0CA564",
    },
    depth: {
      fillAreaAsk: "#0CA564",
      fillAreaBid: "#E6007A",
      gridBackgroundStart: "#0CA564",
      gridBackgroundEnd: "#0CA564",
      strokeAreaAsk: "#0CA564",
      strokeAreaBid: "#E6007A",
      strokeGrid: "rgba(139,161,190,0.2)",
      strokeAxis: "#1C1C26",
    },
  },
};
