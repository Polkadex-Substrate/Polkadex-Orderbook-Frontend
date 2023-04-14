import { FC, PropsWithChildren } from "react";
import { ApiPromise } from "@polkadot/api";

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
    pair: "String",
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
  AssetIdString: {
    _enum: {
      asset: "String",
      polkadex: null,
    },
  },
  WithdrawPayload: {
    asset_id: "AssetIdString",
    amount: "String",
    timestamp: "i64",
  },
};

export type orderbookTypes = typeof orderbookTypes;

export interface NativeApiState {
  connected: boolean;
  connecting: boolean;
  timestamp?: number;
  hasExtension?: boolean;
  api?: ApiPromise;
}

export type NativeApiProps = {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
};

export type NativeApiProviderProps = PropsWithChildren<{
  value: NativeApiContextProps;
}>;

export type NativeApiContextProps = NativeApiState & {
  onConnectNativeApi: () => void;
};

export type NativeApiComponent = FC<PropsWithChildren<NativeApiProps>>;
