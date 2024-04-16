import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { getNonce } from "@orderbook/core/helpers/getNonce";

import { OrderSide, OrderType, OrderTypeEnum } from "../utils/orderbookService";

import { isAssetPDEX } from "./isAssetPDEX";
import { signPayload } from "./enclavePayloadSigner";

export const createOrderPayload = (
  api: ApiPromise,
  proxyAddress: string,
  type: OrderType,
  side: OrderSide,
  baseAsset: string | null,
  quoteAsset: string | null,
  quantity: number | string,
  price: number | string,
  timestamp = 0,
  clientOrderId: Uint8Array,
  mainAddress: string
): Codec => {
  const baseAssetId = !isAssetPDEX(baseAsset) ? baseAsset : "PDEX";
  const quoteAssetId = !isAssetPDEX(quoteAsset) ? quoteAsset : "PDEX";
  const orderType = { [type.toUpperCase()]: null };
  const orderSide = {
    [side]: null,
  };
  const isMarketBid = type === OrderTypeEnum.MARKET && side === "Bid";
  const ZERO = "0"; // for signature verification you have to specify like this.
  const jsonPayload = {
    user: proxyAddress,
    main_account: mainAddress,
    pair: baseAssetId + "-" + quoteAssetId,
    side: orderSide,
    order_type: orderType,
    qty: isMarketBid ? ZERO : quantity.toString(),
    quote_order_quantity: isMarketBid ? quantity.toString() : ZERO,
    price: type === OrderTypeEnum.LIMIT ? price.toString() : ZERO,
    timestamp: timestamp,
    client_order_id: clientOrderId,
  };
  return api.createType("OrderPayload", jsonPayload);
};

export const createCancelOrderPayloadSigned = (
  api: ApiPromise,
  userKeyring: KeyringPair,
  orderId: string,
  base: string,
  quote: string
) => {
  const orderIdCodec = api.createType("order_id", orderId);
  const tradingPair = `${base}-${quote}`;
  const signature = signPayload(api, userKeyring, orderIdCodec);
  return {
    orderId: orderIdCodec,
    account: userKeyring.address,
    pair: tradingPair,
    signature: signature,
  };
};

export const createCancelAllPayload = (
  api: ApiPromise,
  userKeyring: KeyringPair,
  market: string,
  mainAddress: string,
  tradeAddress: string
) => {
  const signingPayload = api.createType("CancelAllPayload", {
    main: mainAddress,
    proxy: tradeAddress,
    market: market,
    timestamp: getNonce(),
  });
  const signature = signPayload(api, userKeyring, signingPayload);
  return { payload: signingPayload, signature };
};
