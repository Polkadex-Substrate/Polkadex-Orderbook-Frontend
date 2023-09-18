import { SubscanResult, TransferHistory } from "@orderbook/core/helpers/types";
import {SUBSCAN_PER_PAGE_LIMIT} from "@orderbook/core/constants";

export const SUBSCAN_GETTERS = {
  fetchTransfers: async (
    apiKey: string,
    address: string,
    page: number
  ): Promise<SubscanResult<TransferHistory[], "transfers">> => {
    return await fetch(
      "https://polkadex.webapi.subscan.io/api/v2/scan/transfers",
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          row: SUBSCAN_PER_PAGE_LIMIT,
          page,
          address,
        }),
      }
    ).then(
      (resp) =>
        resp.json() as unknown as SubscanResult<TransferHistory[], "transfers">
    );
  },
};
