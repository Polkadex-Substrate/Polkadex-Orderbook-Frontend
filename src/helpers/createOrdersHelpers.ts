import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";

import { signPayload } from "./enclavePayloadSigner";

import {
  OrderKindEnum,
  OrderSide,
  OrderSideEnum,
  OrderType,
  OrderTypeEnum,
} from "@polkadex/orderbook/providers/types";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export const createOrderPayload = (
  api: ApiPromise,
  proxyAddress: string,
  type: OrderType,
  side: OrderSide,
  baseAsset: string | null,
  quoteAsset: string | null,
  quantity: number,
  price: number,
  timestamp = 0,
  clientOrderId: Uint8Array,
  mainAddress: string
): Codec => {
  const baseAssetId = !isAssetPDEX(baseAsset) ? baseAsset : "PDEX";
  const quoteAssetId = !isAssetPDEX(quoteAsset) ? quoteAsset : "PDEX";
  const orderType = { [type.toUpperCase()]: null };
  const orderSide = {
    [side === OrderSideEnum.Buy ? OrderKindEnum.Bid : OrderKindEnum.Ask]: null,
  };
  const isMarketBid = type === OrderTypeEnum.MARKET && side === OrderSideEnum.Buy;
  console.log("is market bid", isMarketBid);
  const ZERO = (0).toFixed(8); // for signature verification you have to specify like this.
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
  console.log("jsonPayload for order", jsonPayload);
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
