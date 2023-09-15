import { useCallback, useMemo, useState } from "react";
import {
  useTransactionsProvider,
  Transaction,
} from "@orderbook/core/providers/user/transactionsProvider";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { Tab } from "@headlessui/react";

import * as S from "./styles";
import { PendingTable } from "./pendingTable";
import { ReadyToClaimTable } from "./readyToClaimTable";
import { ClaimedTable } from "./claimedTable";

import { Checkbox, Search } from "@/ui/molecules";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const WithdrawHistory = ({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) => {
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);

  const { selectGetAsset } = useAssetsProvider();

  const { allWithdrawals, readyWithdrawals, loading } =
    useTransactionsProvider();

  const selectedWithdraw = useCallback(
    (status: Transaction["status"]) =>
      allWithdrawals
        ?.filter((txn) => txn.status === status)
        ?.flatMap((withdrawal) => {
          if (showSelectedCoins) {
            const assetName = selectGetAsset(withdrawal.asset)?.name;
            return assetName === selectedAsset?.name ? [withdrawal] : [];
          } else {
            return [withdrawal];
          }
        }),
    [allWithdrawals, showSelectedCoins, selectGetAsset, selectedAsset?.name],
  );

  const readyToClaim = useMemo(() => {
    if (!showSelectedCoins) return readyWithdrawals;

    return readyWithdrawals.filter(({ items, id, sid }) => {
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
    readyWithdrawals,
    selectGetAsset,
    selectedAsset?.name,
    showSelectedCoins,
  ]);

  const pendingWithdraws = useMemo(
    () => selectedWithdraw("PENDING"),
    [selectedWithdraw],
  );

  const claimedWithdraws = useMemo(
    () => selectedWithdraw("CONFIRMED"),
    [selectedWithdraw],
  );

  const hasPendingClaims = useMemo(
    () =>
      readyToClaim.reduce(
        (acc, value) =>
          acc + value.items.filter((v) => v.status === "READY").length,
        0,
      ),
    [readyToClaim],
  );

  console.log("readyToClaim", readyToClaim);
  return (
    <S.Wrapper>
      <S.Header>
        <h3>History</h3>
      </S.Header>
      <Tab.Group>
        <S.Container>
          <S.Title>
            <S.TabList>
              <S.TabItem>Pending</S.TabItem>
              <S.TabItem>Ready to claim</S.TabItem>
              <S.TabItem>Claimed</S.TabItem>
            </S.TabList>
            <S.TitleWrapper>
              <Search isFull placeholder="Search" />
              <Checkbox
                checked={showSelectedCoins}
                onChange={() => setShowSelectedCoins(!showSelectedCoins)}
                labelProps={{ style: { whiteSpace: "nowrap" } }}
              >
                Show only selected token
              </Checkbox>
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
