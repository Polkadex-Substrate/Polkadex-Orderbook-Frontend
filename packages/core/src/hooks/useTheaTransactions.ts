import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { PolkadexChainQuery } from "@polkadex/subscan";
import {
  TheaDepositTransaction,
  TheaWithdrawTransaction,
} from "@polkadex/types";

import { QUERY_KEYS } from "../constants";
import { defaultConfig } from "../config";

const chainQuery = new PolkadexChainQuery(defaultConfig.subqueryUrl);

export const useTheaTransactions = ({
  sourceAddress,
}: {
  sourceAddress: string;
}) => {
  const enabled = useMemo(() => !!sourceAddress, [sourceAddress]);

  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.getTheaBalances(sourceAddress),
        enabled,
        queryFn: async () => {
          const data = await chainQuery.fetchTheaDeposits({
            address: sourceAddress,
          });
          return formatResult(data, true);
        },
      },
      {
        queryKey: QUERY_KEYS.getTheWithadraws(sourceAddress),
        enabled,
        queryFn: async () => {
          const data = await chainQuery.fetchTheaWithdrawals({
            address: sourceAddress,
          });
          return formatResult(data, true);
        },
      },
    ],
  });
};

const formatResult = (
  value: TheaDepositTransaction[] | TheaWithdrawTransaction[],
  isDeposit: true
) =>
  value?.map((data) => ({
    timestamp: Number(data.timestamp),
    amount: data.amount,
    asset: data.assetId,
    from: isDeposit ? data.networkId : 0,
    id: data.blockHash,
    to: isDeposit ? 0 : data.networkId,
    transactionStatus: {
      steps: isDeposit
        ? data.status === "CLAIMED"
          ? "(2/2)"
          : "(1/1)"
        : "(1/1)",
      status: data.status,
    },
    isDeposit,
  }));
