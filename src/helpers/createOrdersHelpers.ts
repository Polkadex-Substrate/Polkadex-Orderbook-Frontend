import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { Client } from "rpc-websockets";
import BigNumber from "bignumber.js";

import { OrderSide, OrderType } from "../modules/types";

import { SignedOrderPayload, signPayload } from "./enclavePayloadSigner";

import { UNIT_BN } from "@polkadex/web-constants";

export const createOrderPayload = (
  api: ApiPromise,
  proxyAddress: string,
  type: OrderType,
  side: OrderSide,
  baseAsset: string | null,
  quoteAsset: string | null,
  quantity: string,
  price: string,
  timestamp = 0,
  client_order_id: Uint8Array,
  mainAddress: string
): Codec => {
  const baseAssetId = baseAsset !== "-1" ? { Asset: baseAsset } : { POLKADEX: null };
  const quoteAssetId = quoteAsset !== "-1" ? { Asset: quoteAsset } : { POLKADEX: null };
  const orderType = { [type.toUpperCase()]: null };
  const orderSide = { [side === "Buy" ? "Bid" : "Ask"]: null };
  const jsonPayload = {
    user: proxyAddress,
    main_account: mainAddress,
    pair: {
      base_asset: baseAssetId,
      quote_asset: quoteAssetId,
    },
    side: orderSide,
    order_type: orderType,
    qty: new BigNumber(quantity).multipliedBy(UNIT_BN).toString(),
    price: type === "LIMIT" ? new BigNumber(price).multipliedBy(UNIT_BN).toString() : null,
    timestamp: timestamp,
    client_order_id,
  };
  const orderPayload = api.createType("OrderPayload", jsonPayload);
  return orderPayload;
};

export const createCancelOrderPayloadSigned = (
  api: ApiPromise,
  userKeyring: KeyringPair,
  orderId: string,
  base: Record<string, string>,
  quote: Record<string, string>
) => {
  const orderIdCodec = api.createType("order_id", orderId);
  const tradingPair = api.createType("TradingPair", { base_asset: base, quote_asset: quote });
  const signature = signPayload(api, userKeyring, orderIdCodec);
  const payload = {
    order_id: orderIdCodec,
    account: userKeyring.address,
    pair: tradingPair,
    signature: signature,
  };
  return payload;
};
