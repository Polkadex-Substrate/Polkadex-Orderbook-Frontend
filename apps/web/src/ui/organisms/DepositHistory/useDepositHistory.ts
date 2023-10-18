/**
 * This hook manages state and actions related to:
 * - Sorting the table
 * - Filter transactions by selected token
 * - Adapt deposit data, including balance retrieval, wallet details, and token information
 * - Retrieve column header text
 */

import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { useMemo, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { useTransactionsProvider } from "@orderbook/core/providers/user/transactionsProvider";
import { useTranslation } from "react-i18next";
import { intlFormat } from "date-fns";

import { columns as getColumns } from "./columns";
import * as T from "./types";

import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export function useDepositHistory({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) {
  const { t } = useTranslation("transfer");

  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();
  const { selectGetAsset } = useAssetsProvider();
  const { deposits, loading } = useTransactionsProvider();

  const { mainAddress } = selectedAccount;
  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const data = useMemo(
    () =>
      deposits
        ?.filter((e) => {
          if (showSelectedCoins) {
            const assetName = selectGetAsset(e.asset)?.name;
            return assetName === selectedAsset?.name;
          }
          return e;
        })
        ?.map((e) => {
          const token = selectGetAsset(e.asset);
          return {
            stid: e.stid,
            snapshot_id: e.snapshot_id,
            amount: e.amount,
            fee: e.fee,
            main_account: e.main_account,
            time: intlFormat(
              new Date(e.time),
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
              { locale: "EN" }
            ),
            status: e.status,
            txn_type: e.txn_type,
            isReverted: e.isReverted,
            token: {
              ticker: token?.symbol,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: t("trading.type"),
            },
          } as T.Props;
        }),
    [
      deposits,
      selectGetAsset,
      fundingWallet?.account?.meta?.name,
      fundingWallet?.account?.address,
      selectedAsset?.name,
      showSelectedCoins,
      t,
    ]
  );

  const columns = useMemo(
    () =>
      getColumns([
        t("tableHeader.date"),
        t("tableHeader.name"),
        t("tableHeader.amount"),
        t("tableHeader.fees"),
        t("tableHeader.transfer"),
      ]),
    [t]
  );

  return {
    showSelectedCoins,
    onShowSelectedCoins: () => setShowSelectedCoins(!showSelectedCoins),
    sorting,
    setSorting,
    columns,
    data,
    loading,
  };
}
