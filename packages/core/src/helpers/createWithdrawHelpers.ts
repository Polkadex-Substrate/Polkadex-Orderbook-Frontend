import { ApiPromise } from "@polkadot/api";

export const createWithdrawSigningPayload = (
  api: ApiPromise,
  asset: string | "PDEX",
  amount: string | number,
  timestamp: number
) => {
  return api.createType("WithdrawPayload", {
    asset_id: asset === "PDEX" ? { polkadex: null } : { asset },
    amount,
    timestamp,
  });
};
