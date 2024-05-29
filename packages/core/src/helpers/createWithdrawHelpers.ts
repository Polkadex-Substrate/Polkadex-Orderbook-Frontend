import { ApiPromise } from "@polkadot/api";
import { getNonce } from "@orderbook/core/helpers/getNonce";

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
      destination_network: null,
    };
  }
  const data = {
    asset_id:
      payload.asset === "PDEX" ? { polkadex: null } : { asset: payload.asset },
    amount: payload.amount,
    timestamp: getNonce(),
    destination_network: null,
  };
  return data;
};
