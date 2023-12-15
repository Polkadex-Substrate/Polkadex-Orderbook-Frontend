import { useCallback, useMemo, useState } from "react";
import { intlFormat } from "date-fns";
import { Transaction } from "@orderbook/core/utils/orderbookService";
import { useTransactions } from "@orderbook/core/hooks";
import { Tab } from "@headlessui/react";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { WithdrawGroupItem } from "@orderbook/core/helpers";
import { useTranslation } from "next-i18next";

import * as S from "./styles";
import { PendingTable } from "./pendingTable";
import { ReadyToClaimTable } from "./readyToClaimTable";
import { ClaimedTable } from "./claimedTable";
import { ReadyToClaimDataProps, WithdrawTableProps } from "./types";

import { CheckboxCustom, Search } from "@/ui/molecules";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const WithdrawHistory = ({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) => {
  const { t } = useTranslation("transfer");

  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);

  const { allWithdrawals, readyWithdrawals, loading } = useTransactions();
  const { selectedAddresses } = useProfile();
  const { allAccounts } = useExtensionWallet();

  const { mainAddress } = selectedAddresses;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const selectedWithdraw = useCallback(
    (status: Transaction["status"]): WithdrawTableProps[] =>
      allWithdrawals
        ?.filter((txn) => txn.status === status)
        ?.map((e) => {
          const token = e.asset;
          return {
            ...e,
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
              ticker: token?.ticker,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: t("trading.type"),
            },
          };
        })
        ?.flatMap((withdrawal) => {
          if (showSelectedCoins) {
            const assetName = withdrawal.token?.name;
            return assetName === selectedAsset?.name ? [withdrawal] : [];
          }
          return [withdrawal];
        }),
    [
      allWithdrawals,
      showSelectedCoins,
      selectedAsset?.name,
      fundingWallet?.account?.address,
      fundingWallet?.account?.meta?.name,
      t,
    ]
  );

  const readyWithdrawalsData = useMemo(
    () =>
      readyWithdrawals.map((e) => {
        const items = e.items?.map((e: WithdrawGroupItem) => {
          const token = e.asset;
          return {
            ...e,
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
            token: {
              ticker: token?.ticker,
              name: token?.name,
              assetId: token?.id,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: t("trading.type"),
            },
          };
        });
        return {
          ...e,
          items,
        } as ReadyToClaimDataProps;
      }),
    [
      readyWithdrawals,
      fundingWallet?.account?.meta?.name,
      fundingWallet?.account?.address,
      t,
    ]
  );

  const readyToClaim = useMemo(() => {
    if (!showSelectedCoins) return readyWithdrawalsData;

    return readyWithdrawalsData.filter(({ items, id, sid }) => {
      const filteredItems = items.filter((item) => {
        const assetName = item.asset?.name;
        return assetName === selectedAsset?.name && item;
      });
      return (
        filteredItems.length && {
          id,
          sid,
          items: filteredItems,
        }
      );
    });
  }, [readyWithdrawalsData, selectedAsset?.name, showSelectedCoins]);

  const pendingWithdraws = useMemo(
    () => selectedWithdraw("PENDING"),
    [selectedWithdraw]
  );

  const claimedWithdraws = useMemo(
    () => selectedWithdraw("CONFIRMED"),
    [selectedWithdraw]
  );

  const pendingClaims: number = useMemo(
    () =>
      readyToClaim.reduce(
        (acc, value) =>
          acc + value.items.filter((v) => v.status === "READY").length,
        0
      ),
    [readyToClaim]
  );

  return (
    <S.Wrapper>
      <S.Header>
        <h3>{t("historyTitle")}</h3>
      </S.Header>
      <Tab.Group>
        <S.Container>
          <S.Title>
            <S.TabList>
              <S.TabItemPending>
                {pendingWithdraws?.length > 0 && (
                  <div>{pendingWithdraws.length}</div>
                )}
                {t("tabs.pending")}
              </S.TabItemPending>
              <S.TabItemPending>
                {pendingClaims > 0 && <div>{pendingClaims}</div>}
                {t("tabs.readyToClaim")}
              </S.TabItemPending>
              <S.TabItem>{t("tabs.claimed")}</S.TabItem>
            </S.TabList>
            <S.TitleWrapper>
              <Search isFull placeholder={t("searchPlaceholder")} />
              <CheckboxCustom
                checked={showSelectedCoins}
                onChange={() => setShowSelectedCoins(!showSelectedCoins)}
                labelProps={{ style: { whiteSpace: "nowrap" } }}
              >
                {t("historyFilterByToken")}
              </CheckboxCustom>
            </S.TitleWrapper>
          </S.Title>
          <Tab.Panels className="flex-1">
            <Tab.Panel className="flex-1">
              <S.Table>
                <PendingTable
                  data={pendingWithdraws}
                  loading={loading}
                  hasData={!!pendingWithdraws?.length}
                />
              </S.Table>
            </Tab.Panel>
            <Tab.Panel className="flex-1">
              <S.Table>
                <ReadyToClaimTable
                  data={readyToClaim}
                  loading={loading}
                  hasData={!!readyToClaim?.length}
                />
              </S.Table>
            </Tab.Panel>
            <Tab.Panel className="flex-1">
              <S.Table>
                <ClaimedTable
                  data={claimedWithdraws}
                  loading={loading}
                  hasData={!!claimedWithdraws?.length}
                />
              </S.Table>
            </Tab.Panel>
          </Tab.Panels>
        </S.Container>
      </Tab.Group>
    </S.Wrapper>
  );
};
