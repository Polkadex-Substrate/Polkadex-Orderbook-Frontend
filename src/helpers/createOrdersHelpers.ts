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
  quantity: string,
  price: string,
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
  const zero = (0).toFixed(8);
  const jsonPayload = {
    user: proxyAddress,
    main_account: mainAddress,
    pair: baseAssetId + "-" + quoteAssetId,
    side: orderSide,
    order_type: orderType,
    qty: isMarketBid ? zero : quantity.toString(),
    quote_order_quantity: isMarketBid ? quantity.toString() : zero,
    price: type === OrderTypeEnum.LIMIT ? price.toString() : zero,
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
