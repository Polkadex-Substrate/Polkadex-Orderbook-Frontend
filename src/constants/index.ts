export const UNIT = BigInt(1000_000_000_000);
export const DEFAULT_TRADING_VIEW_INTERVAL = "5";
export const DEFAULT_RANDOM_STRING_LENGTH = 20;
export const QUEUE_EXPIRY_TIME = 3000000;
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
export const marketIdMap = {
  0: { name: "POLKADOGE", symbol: "PDG" },
  1: { name: "SHIBADEX", symbol: "SDX" },
};
