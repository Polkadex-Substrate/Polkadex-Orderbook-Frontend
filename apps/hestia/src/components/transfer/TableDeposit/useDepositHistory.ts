/**
 * This hook manages state and actions related to:
 * - Sorting the table
 * - Filter transactions by selected token
 * - Adapt deposit data, including balance retrieval, wallet details, and token information
 * - Retrieve column header text
 */

import { useTransactions } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { getFundingAccountDetail } from "@orderbook/core/helpers";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { ChangeEvent, useMemo, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { useTranslation } from "next-i18next";
import { intlFormat } from "date-fns";

import { DepositData, columns } from "./columns";

import { FilteredAssetProps } from "@/hooks";

export function useDepositHistory({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) {
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const { selectedAddresses } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { deposits, loading } = useTransactions();

  const { mainAddress } = selectedAddresses;
  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, extensionAccounts),
    [extensionAccounts, mainAddress]
  );

  const data = useMemo(
    () =>
      deposits
        ?.filter((e) => {
          const isMatch =
            e.asset.name.toLowerCase().includes(search) ||
            e.asset.ticker.toLowerCase().includes(search);
          if (isMatch) {
            if (showSelectedCoins) {
              const assetName = e.asset.name;
              return assetName === selectedAsset?.name;
            }
            return e;
          }
          return null;
        })
        ?.map((e) => {
          return {
            ...e,
            main_account: mainAddress,
            timestamp: intlFormat(
              new Date(e.timestamp),
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
              { locale: "EN" }
            ),
            token: {
              ticker: e.asset?.ticker,
              name: e.asset?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.name ?? "",
              fromWalletAddress: fundingWallet?.address ?? "",
              toWalletType: "Trading Account",
            },
          } as DepositData;
        }),
    [
      deposits,
      fundingWallet?.name,
      fundingWallet?.address,
      selectedAsset?.name,
      showSelectedCoins,
      mainAddress,
      search,
    ]
  );
  return {
    showSelectedCoins,
    onShowSelectedCoins: () => setShowSelectedCoins(!showSelectedCoins),
    onSetSearch: (e: ChangeEvent<HTMLInputElement>) =>
      setSearch(e.target.value.toLowerCase()),
    sorting,
    setSorting,
    columns,
    data,
    loading,
  };
}
