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
    main_account: "AccountId",
    pair: "TradingPair",
    side: "OrderSide",
    order_type: "OrderType",
    quote_order_quantity: "String", // Quantity is defined in base asset
    qty: "String",
    price: "String", // Price is defined in quote asset per unit base asset
    timestamp: "i64",
  },
  order_id: "H256",
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
    amount: "String",
    timestamp: "i64",
  },
};

export type orderbookTypes = typeof orderbookTypes;
