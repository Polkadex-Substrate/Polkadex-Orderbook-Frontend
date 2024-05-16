// TODO: Move to thea package

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { PolkadexChainQuery } from "@polkadex/subscan";
import {
  TheaDepositTransaction,
  TheaWithdrawTransaction,
} from "@polkadex/types";
import { toUnit } from "@polkadex/numericals";
import { Asset, Chain } from "@polkadex/thea";

import { POLKADEX_GENESIS, QUERY_KEYS } from "../constants";
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
        queryKey: QUERY_KEYS.getTheDeposits(sourceAddress, assets.length),
        enabled,
        queryFn: async () => {
          const data = await chainQuery.fetchTheaDeposits({
            address: sourceAddress,
          });
          return formatResult(data, assets, chains, true);
        },
      },
      {
        queryKey: QUERY_KEYS.getTheWithadraws(sourceAddress, assets.length),
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
    const networkId = networks[data?.networkId ?? 0].id;
    const assetId = data?.assetId.toString();
    const pdexAsset = assets.find((e) => typeof e?.id === "undefined");
    const asset = assets.find((e) => e?.id?.toString().includes(assetId));
    const fromNetwork = chains.find((e) =>
      e.genesis.toString().includes(networkId)
    );

    const polkadexNetwork = chains.find((e) =>
      e.genesis.toString().includes(POLKADEX_GENESIS)
    );

    const decimales =
      networks.find(
        (x) => x.ticker.toLowerCase() === asset?.ticker.toLowerCase()
      )?.decimals ?? 12;

    return {
      timestamp: Number(data.timestamp),
      amount: toUnit(data.amount, isDeposit ? decimales : 12),
      asset: asset || pdexAsset,
      from: isDeposit ? fromNetwork : polkadexNetwork,
      id: isDeposit ? data.id : data.blockHash,
      to: isDeposit ? polkadexNetwork : fromNetwork,
      status: data.status,
      hash: data.blockHash,
      isDeposit,
    };
  });

export type Transactions = ReturnType<typeof formatResult>;
export type Transaction = Transactions[0];

// TEMP
export const networks = [
  {
    // Polkadex
    id: "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c",
    decimals: 18,
    ticker: "PDEX",
  },
  {
    // Polkadot
    id: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    decimals: 10,
    ticker: "DOT",
  },
  {
    // Asset Hub
    id: "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f",
    decimals: 10,
    ticker: "DOT",
  },

  {
    // Astar
    id: "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
    decimals: 18,
    ticker: "ASTR",
  },
  {
    // Phala
    id: "0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736",
    decimals: 12,
    ticker: "PHA",
  },
  {
    // Moonbeam
    id: "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
    decimals: 18,
    ticker: "GLMR",
  },
  {
    // Unique
    id: "0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31",
    decimals: 18,
    ticker: "UNQ",
  },
  {
    // Interlay
    id: "0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72",
    decimals: 10,
    ticker: "INTR",
  },
];
