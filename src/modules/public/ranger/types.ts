export const orderbookTypes = {
  Address: "MultiAddress",
  LookupSource: "MultiAddress",
  AssetId: {
    _enum: {
      Asset: "u128",
      POLKADEX: null,
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
    client_order_id: "H256",
    user: "AccountId",
    pair: "TradingPair",
    side: "OrderSide",
    order_type: "OrderType",
    qty: "u128",
    price: "u128",
    timestamp: "i64",
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
