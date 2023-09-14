import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { defaultConfig } from "@orderbook/core/config";

import { AssetsTable } from "../AssetsTable";

import { AssetsTableSkeleton } from "./skeleton";
import * as S from "./styles";
import * as T from "./types";

import { Icons } from "@/ui/atoms";
import { Checkbox, Search } from "@/ui/molecules";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const AssetsInteraction = ({
  open,
  onClose,
  onChangeAsset,
  selectedAssetId,
}: {
  open: boolean;
  selectedAssetId?: string;
  onClose: (e: boolean) => void;
  onChangeAsset: (e: FilteredAssetProps) => void;
}) => {
  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list, loading } = useAssetsProvider();
  const { balances } = useBalancesProvider();

  const assets = useMemo(
    () =>
      list
        ?.map((e: T.AssetsProps) => {
          const tokenBalance = balances?.find(
            (value) => value.assetId === e.assetId,
          );
          const free_balance =
            tokenBalance?.free_balance === "0"
              ? "0.00"
              : tokenBalance?.free_balance || "0.00";

          const onChainBalance =
            tokenBalance?.onChainBalance === "0"
              ? "0.00"
              : tokenBalance?.onChainBalance || "0.00";

          return {
            ...e,
            free_balance,
            onChainBalance,
          };
        })
        ?.filter((e: T.AssetsProps) => {
          const hasZeroAmount =
            filters.hideZero && Number(e?.free_balance || 0) < 0.001;

          const matchesNameOrTicker =
            e.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            e.symbol.toLowerCase().includes(filters.search.toLowerCase());

          return (
            matchesNameOrTicker &&
            !hasZeroAmount &&
            !defaultConfig.blockedAssets?.some((value) => e.assetId === value)
          );
        })
        ?.sort((a, b) => a.name.localeCompare(b.name)),
    [filters.search, list, balances, filters.hideZero],
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        open={open}
        onClose={onClose}
        style={{ position: "relative", zIndex: 100 }}
      >
        <Transition.Child
          as={Fragment}
          enter="enter"
          enterFrom="fadeEnterFrom"
          enterTo="fadEenterTo"
          leave="leave"
          leaveFrom="fadeLeaveFrom"
          leaveTo="fadeLeaveTo"
        >
          <S.Overlay />
        </Transition.Child>
        <S.Modal>
          <S.ModalWrapper>
            <Transition.Child
              as={Fragment}
              enter="enter"
              enterFrom="transformEnterFrom"
              enterTo="transformEnterTo"
              leave="leave"
              leaveFrom="transformLeaveFrom"
              leaveTo="transformLeaveTo"
            >
              <S.ModalPanel>
                <S.ModalTitle onClick={onClose}>
                  <Icons.SingleArrowLeft />
                </S.ModalTitle>
                <S.ModalContent>
                  <h3>Assets</h3>
                  <S.ModalContentHeader>
                    <Checkbox
                      checked={filters.hideZero}
                      onChange={() =>
                        setFilters({
                          ...filters,
                          hideZero: !filters.hideZero,
                        })
                      }
                      labelProps={{ style: { whiteSpace: "nowrap" } }}
                    >
                      Hide 0 balances
                    </Checkbox>
                    <Search
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      hasBorder={false}
                      placeholder="Search"
                    />
                  </S.ModalContentHeader>
                  {loading ? (
                    <AssetsTableSkeleton />
                  ) : (
                    <S.ModalContentTable>
                      <AssetsTable
                        assets={assets}
                        selectedAssetId={selectedAssetId}
                        onChangeAsset={onChangeAsset}
                      />
                    </S.ModalContentTable>
                  )}
                </S.ModalContent>
              </S.ModalPanel>
            </Transition.Child>
          </S.ModalWrapper>
        </S.Modal>
      </Dialog>
    </Transition>
  );
};
