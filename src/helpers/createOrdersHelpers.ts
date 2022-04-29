import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { Client } from "rpc-websockets";

import { OrderSide, OrderType } from "../modules/types";

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
  const baseAssetId = baseAsset
    ? { base_asset: { Asset: baseAsset } }
    : { base_asset: { POLKADEX: null } };
  const quoteAssetId = quoteAsset
    ? { quote_asset: { Asset: quoteAsset } }
    : { quote_asset: { POLKADEX: null } };
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
    qty: quantity,
    price: price,
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
  const signature = userKeyring.sign(orderPayload.toU8a());

  // TODO: Convert Sr25519 signature to MultiSignature type elegantly
  const encoded_signature = new Uint8Array(signature.length + 1);
  encoded_signature[0] = 1;
  for (let i = 1; i < signature.length + 1; i++) encoded_signature[i] = signature[i];
  const multi_signature = api.createType("MultiSignature", encoded_signature);

  const multisignature = {
    Sr25519: multi_signature.asSr25519
      .toHex()
      .substring(2, multi_signature.asSr25519.toHex().length),
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
