import BigNumber from "bignumber.js";

import { UNIT_BN } from "@polkadex/web-constants";

export const Utils = {
  decimals: {
    formatToNumber(value: number | BigInt | string | BigNumber): number {
      const str = value.toString();
      return new BigNumber(str).div(UNIT_BN).toNumber();
    },
    formatToString(value: number | BigInt | string | BigNumber): string {
      const str = value.toString();
      return new BigNumber(str).div(UNIT_BN).toString();
    },
  },
  date: {
    formatDateToISO(date: Date | string | number): string {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    },
  },
};
