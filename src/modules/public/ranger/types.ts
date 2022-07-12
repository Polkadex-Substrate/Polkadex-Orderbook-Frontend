export const orderbookTypes = {
  Address: "MultiAddress",
  LookupSource: "MultiAddress",
  AssetId: {
    _enum: {
      POLKADEX: null,
      Asset: "u128",
    },
  },
  CurrencyId: "AssetId",
  ShardIdentifier: "H256",
  Balance: "u128",
  BalanceOf: "Balance",
  AccountInfo: {
    nonce: "Index",
    consumers: "RefCount",
    providers: "RefCount",
    sufficients: "RefCount",
    sufficients2: "u128",
    data: "AccountData",
  },
  OrderPayload: {
    user: "AccountId",
    pair: "TradingPair",
    side: "OrderSide",
    order_type: "OrderType",
    qty: "u128",
    price: "u128",
    nonce: "u32",
  },
  CancelOrderPayload: { id: "String" },
  TradingPair: {
    base_asset: "AssetId",
    quote_asset: "AssetId",
  },
  OrderSide: {
    _enum: {
      Ask: null,
      Bid: null,
    },
  },
  OrderType: {
    _enum: {
      LIMIT: null,
      MARKET: null,
    },
  },
  WithdrawPayload: {
    asset_id: "AssetId",
    amount: "Balance",
    account: "AccountId",
    nonce: "u32",
  },
};

export type orderbookTypes = typeof orderbookTypes;
