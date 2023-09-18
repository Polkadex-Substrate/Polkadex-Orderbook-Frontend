import { useCallback, useMemo, useState } from "react";
import { intlFormat } from "date-fns";
import {
  useTransactionsProvider,
  Transaction,
} from "@orderbook/core/providers/user/transactionsProvider";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { Tab } from "@headlessui/react";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { WithdrawGroupItem } from "@orderbook/core/helpers";

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
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(true);

  const { selectGetAsset } = useAssetsProvider();
  const { allWithdrawals, readyWithdrawals, loading } =
    useTransactionsProvider();
  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();

  const { mainAddress } = selectedAccount;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const selectedWithdraw = useCallback(
    (status: Transaction["status"]) =>
      allWithdrawals
        ?.filter((txn) => txn.status === status)
        ?.map((e) => {
          const token = selectGetAsset(e.asset);
          return {
            ...e,
            token: {
              ticker: token?.symbol,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: "Trading Account",
            },
          };
        })
        ?.flatMap((withdrawal) => {
          if (showSelectedCoins) {
            const assetName = selectGetAsset(withdrawal.asset)?.name;
            return assetName === selectedAsset?.name ? [withdrawal] : [];
          }
          return [withdrawal];
        }),
    [
      allWithdrawals,
      showSelectedCoins,
      selectGetAsset,
      selectedAsset?.name,
      fundingWallet?.account?.address,
      fundingWallet?.account?.meta?.name,
    ]
  );

  const readyWithdrawalsData = useMemo(
    () =>
      readyWithdrawals.map((e) => {
        const items = e.items?.map((e: WithdrawGroupItem) => {
          const token = selectGetAsset(e.asset);
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
              ticker: token?.symbol,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: "Funding Account",
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
      selectGetAsset,
    ]
  );

  const readyToClaim = useMemo(() => {
    if (!showSelectedCoins) return readyWithdrawalsData;

    return readyWithdrawalsData.filter(({ items, id, sid }) => {
      const filteredItems = items.filter((item) => {
        const assetName = selectGetAsset(item.asset)?.name;
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
  }, [
    readyWithdrawalsData,
    selectGetAsset,
    selectedAsset?.name,
    showSelectedCoins,
  ]);

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
        <h3>History</h3>
      </S.Header>
      <Tab.Group>
        <S.Container>
          <S.Title>
            <S.TabList>
              <S.TabItem>Pending({pendingWithdraws?.length})</S.TabItem>
              <S.TabItemPending>
                {pendingClaims > 0 && <div>{pendingClaims}</div>}
                Ready to claim
              </S.TabItemPending>
              <S.TabItem>Claimed({claimedWithdraws?.length})</S.TabItem>
            </S.TabList>
            <S.TitleWrapper>
              <Search isFull placeholder="Search" />
              <CheckboxCustom
                checked={showSelectedCoins}
                onChange={() => setShowSelectedCoins(!showSelectedCoins)}
                labelProps={{ style: { whiteSpace: "nowrap" } }}
              >
                Show only selected token
              </CheckboxCustom>
            </S.TitleWrapper>
          </S.Title>
          <Tab.Panels className="flex-1">
            <Tab.Panel className="flex-1">
              <S.Table>
                <PendingTable
                  data={pendingWithdraws as WithdrawTableProps[]}
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
                  data={claimedWithdraws as WithdrawTableProps[]}
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
