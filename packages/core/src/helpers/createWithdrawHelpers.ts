import { ApiPromise } from "@polkadot/api";
import { getNonce } from "@orderbook/core/helpers/getNonce";
import { Codec } from "@polkadot/types/types";

type WithdrawPayload = {
  asset: string | "PDEX";
  amount: string | number;
};

export const createWithdrawSigningPayload = (
  payload: WithdrawPayload,
  api: ApiPromise,
  isExtensionSigner: boolean
) => {
  if (isExtensionSigner) {
    return {
      asset_id: { asset: payload.asset },
      amount: payload.amount,
      timestamp: getNonce(),
    };
  }
  const data = {
    asset_id:
      payload.asset === "PDEX" ? { polkadex: null } : { asset: payload.asset },
    amount: payload.amount,
    timestamp: getNonce(),
  };
  return api.createType("WithdrawPayload", { ...data }) as Codec;
};
