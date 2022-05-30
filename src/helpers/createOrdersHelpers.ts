import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { Client } from "rpc-websockets";
import { u8aToHex } from "@polkadot/util";
import BigNumber from "bignumber.js";

import { OrderSide, OrderType } from "../modules/types";

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
  nonce = "0"
): Codec => {
  const baseAssetId = baseAsset !== "-1" ? { Asset: baseAsset } : { POLKADEX: null };
  const quoteAssetId = quoteAsset !== "-1" ? { Asset: quoteAsset } : { POLKADEX: null };
  const orderType = { [type.toUpperCase()]: null };
  const orderSide = { [side === "Buy" ? "Bid" : "Ask"]: null };
  const orderPayload = api.createType("OrderPayload", {
    user: proxyAddress,
    pair: {
      base_asset: baseAssetId,
      quote_asset: quoteAssetId,
    },
    side: orderSide,
    order_type: orderType,
    qty: new BigNumber(quantity).multipliedBy(UNIT_BN).toString(),
    price: new BigNumber(price).multipliedBy(UNIT_BN).toString(),
    nonce: nonce,
  });
  return orderPayload;
};
type SignedOrderPayload = {
  Sr25519: string;
};
export const signOrderPayload = (
  api: ApiPromise,
  userKeyring: KeyringPair,
  orderPayload: Codec
): SignedOrderPayload => {
  const signatureU8 = userKeyring.sign(orderPayload.toU8a(), { withType: true });
  const signature = u8aToHex(signatureU8);
  const multi_signature: any = api.createType("MultiSignature", signature);
  const multisignature = {
    Sr25519: multi_signature.toJSON().sr25519.slice(2),
  };
  return multisignature;
};

export const placeOrderToEnclave = async (
  enclaveClient: Client,
  order: Codec,
  multisignature: SignedOrderPayload
) => {
  const res = await enclaveClient.call("enclave_placeOrder", [order, multisignature]);
  return res;
};
