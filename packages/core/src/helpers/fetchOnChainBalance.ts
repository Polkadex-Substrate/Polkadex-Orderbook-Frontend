import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";

import { isAssetPDEX } from "./isAssetPDEX";

import { UNIT_BN } from "@/constants";

export const fetchOnChainBalance = async (
  api: ApiPromise,
  assetId: string,
  address: string,
): Promise<number> => {
  if (!api.isConnected) {
    return 0;
  }
  if (isAssetPDEX(assetId)) {
    const res = await api.query.system.account(address);
    const balanceJson: BalanceJson = res.toJSON() as BalanceJson;
    return new BigNumber(balanceJson?.data?.free || 0)
      .dividedBy(UNIT_BN)
      .toNumber();
  } else {
    const res = await api.query.assets.account(assetId, address);
    const balanceJson: any = res.toJSON();
    return new BigNumber(balanceJson?.balance || "0")
      .dividedBy(UNIT_BN)
      .toNumber();
  }
};

export type BalanceJson = {
  consumers: number;
  data: DataObj;
  nonce: number;
  providers: number;
  sufficients: number;
};

export type DataObj = {
  flags: string;
  free: number;
  frozen: number;
  reserved: number;
};