import { ApiPromise } from "@polkadot/api";

export const createWithdrawPayload = (
  api: ApiPromise,
  asset: Record<string, string | null>,
  amount: string | number,
  nonce: number
) => {
  const withdraw_paylod = api.createType("WithdrawPayload", {
    asset_id: asset,
    amount,
    nonce: nonce,
  });
  return withdraw_paylod;
};
