import { ApiPromise } from "@polkadot/api";
import { Codec } from "@polkadot/types-codec/types";
import { Client } from "rpc-websockets";

import { SignedOrderPayload } from "./enclavePayloadSigner";

export const createWithdrawPayload = (
  api: ApiPromise,
  asset: Record<string, string | null>,
  amount: string,
  nonce: number
) => {
  const withdraw_paylod = api.createType("WithdrawPayload", {
    asset_id: asset,
    amount,
    nonce: nonce,
  });
  return withdraw_paylod;
};

export const placeWithdrawToEnclave = async (
  ws: Client,
  payload: Codec,
  address: string,
  signature: SignedOrderPayload
) => {
  const res = await ws.call("enclave_withdraw", [address, payload, signature]);
  return res;
};
