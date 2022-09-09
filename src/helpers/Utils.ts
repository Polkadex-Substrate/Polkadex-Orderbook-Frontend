import BigNumber from "bignumber.js";

import { UNIT_BN } from "@polkadex/web-constants";

export const Utils = {
  date: {
    formatDateToISO(date: Date | string | number): string {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    },
  },
};
