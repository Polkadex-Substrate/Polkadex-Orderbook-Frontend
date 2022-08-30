import { ApiPromise } from "@polkadot/api";

export const createWithdrawPayload = (
  api: ApiPromise,
  asset: Record<string, string | null>,
  amount: string | number,
  timestamp: number
) => {
  const withdraw_paylod = api.createType("WithdrawPayload", {
    asset_id: asset,
    amount,
    timestamp,
  });
  return withdraw_paylod;
};
