import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";
import { Codec } from "@polkadot/types/types";

import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { UNIT_BN } from "@polkadex/web-constants";
export const fetchOnChainBalance = async (
  api: ApiPromise,
  assetId: string,
  address: string
): Promise<number> => {
  if (!api.isConnected) {
    return 0;
  }
  const res = await getBalanceQuery(api, assetId, address);
  const balanceJson: any = res.toJSON();
  return new BigNumber(balanceJson?.balance || "0").dividedBy(UNIT_BN).toNumber();
};

export const fetchOnChainBalances = async (
  api: ApiPromise,
  assetIds: string[],
  address: string
): Promise<Map<string, number>> => {
  const queries = assetIds.map((id) => getBalanceQuery(api, id, address));
  const rawRes = await Promise.all(queries);
  const balances = new Map<string, number>();
  // order is preserved in Promise.all
  rawRes.forEach((item, index) => {
    balances.set(assetIds[index], formatBalanceResult(item));
  });
  return balances;
};

const formatBalanceResult = (res: Codec): number => {
  const balanceJson = res.toJSON();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new BigNumber(balanceJson?.balance || balanceJson?.data?.free || "0")
    .dividedBy(UNIT_BN)
    .toNumber();
};

const getBalanceQuery = (api: ApiPromise, assetId: string, address: string) => {
  if (isAssetPDEX(assetId)) {
    return api.query.system.account(address);
  } else {
    return api.query.assets.account(assetId, address);
  }
};
