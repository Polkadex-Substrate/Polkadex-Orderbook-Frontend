import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";

import { isAssetPDEX } from "../modules/public/assets";

import { UNIT_BN } from "@polkadex/web-constants";

export const fetchOnChainBalance = async (
  api: ApiPromise,
  assetId: string,
  address: string
): Promise<number> => {
  if (isAssetPDEX(assetId)) {
    const res = await api.query.system.account(address);
    const balanceJson = res.toJSON();
    const balance = new BigNumber(balanceJson?.data?.free || 0).dividedBy(UNIT_BN).toNumber();
    return balance;
  } else {
    const res = await api.query.assets.account(assetId, address);
    const balanceJson = res.toJSON();
    const freeBalance = new BigNumber(balanceJson?.balance || "0")
      .dividedBy(UNIT_BN)
      .toNumber();
    return freeBalance;
  }
};
