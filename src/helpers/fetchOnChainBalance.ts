import { ApiPromise } from "@polkadot/api";
import BigNumber from "bignumber.js";

import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { UNIT_BN } from "@polkadex/web-constants";

export const fetchOnChainBalance = async (
  api: ApiPromise,
  assetId: string,
  address: string
): Promise<number> => {
  if (isAssetPDEX(assetId)) {
    const res = await api.query.system.account(address);

    const balanceJson: BalanceJson = res.toJSON() as BalanceJson;

    const balance = new BigNumber(balanceJson?.data?.free || 0).dividedBy(UNIT_BN).toNumber();
    return balance;
  } else {
    const res = await api.query.assets.account(assetId, address);
    const balanceJson: any = res.toJSON();

    const freeBalance = new BigNumber(balanceJson?.balance || "0")
      .dividedBy(UNIT_BN)
      .toNumber();
    return freeBalance;
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
