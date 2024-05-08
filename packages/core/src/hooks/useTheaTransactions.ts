import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { PolkadexChainQuery } from "@polkadex/subscan";
import {
  TheaDepositTransaction,
  TheaWithdrawTransaction,
} from "@polkadex/types";
import { toUnit } from "@polkadex/numericals";
import { Asset, Chain } from "@polkadex/thea";

import { QUERY_KEYS } from "../constants";
import { defaultConfig } from "../config";

const chainQuery = new PolkadexChainQuery(defaultConfig.subqueryUrl);

export const useTheaTransactions = ({
  sourceAddress = "",
  assets,
  chains,
}: {
  sourceAddress?: string;
  assets: Asset[];
  chains: Chain[];
}) => {
  const enabled = useMemo(
    () => !!sourceAddress && !!assets && !!chains,
    [sourceAddress, assets, chains]
  );

  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.getTheDeposits(sourceAddress),
        enabled,
        queryFn: async () => {
          const data = await chainQuery.fetchTheaDeposits({
            address: sourceAddress,
          });
          return formatResult(data, assets, chains, true);
        },
      },
      {
        queryKey: QUERY_KEYS.getTheWithadraws(sourceAddress),
        enabled,
        queryFn: async () => {
          const data = await chainQuery.fetchTheaWithdrawals({
            address: sourceAddress,
          });
          return formatResult(data, assets, chains);
        },
      },
    ],
  });
};

const formatResult = (
  value: TheaDepositTransaction[] | TheaWithdrawTransaction[],
  assets: Asset[],
  chains: Chain[],
  isDeposit = false
) =>
  value?.map((data) => {
    const assetId = data?.assetId.toString();
    const networkId = networks[data?.networkId];
    const pdexAsset = assets.find((e) => typeof e?.id === "undefined");

    const asset = assets.find((e) => e?.id?.toString().includes(assetId));
    const fromNetwork = chains.find((e) =>
      e.genesis.toString().includes(networkId)
    );
    const polkadexNetwork = chains.find((e) =>
      e.genesis.toString().includes(networks[0])
    );

    return {
      timestamp: Number(data.timestamp),
      amount: toUnit(data.amount, asset?.decimal || 12),
      asset: asset || pdexAsset,
      from: isDeposit ? fromNetwork : polkadexNetwork,
      id: isDeposit ? data.id : data.blockHash,
      to: isDeposit ? polkadexNetwork : fromNetwork,
      status: data.status,
      isDeposit,
    };
  });

export type Transactions = ReturnType<typeof formatResult>;

// Temp
export const networks = [
  "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c", // Polkadex
  "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3", // Polkadot
  "0x25a5cc106eea7138acab33231d7160d69cb777ee0c2c553fcddf5138993e6dd9", // Ethereum
];
