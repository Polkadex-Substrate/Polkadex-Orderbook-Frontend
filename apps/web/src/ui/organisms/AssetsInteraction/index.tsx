import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { defaultConfig } from "@orderbook/core/config";

import { AssetsTable } from "../AssetsTable";

import * as S from "./styles";
import * as T from "./types";

import { Icons } from "@/ui/atoms";
import { Checkbox, Search } from "@/ui/molecules";

export const AssetsInteraction = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (e: boolean) => void;
}) => {
  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list, loading: isAssetsFetching } = useAssetsProvider();
  const { balances: userBalances, loading: isBalanceFetching } =
    useBalancesProvider();

  const assets = useMemo(
    () =>
      list
        ?.map((e: T.AssetsProps) => {
          const tokenBalance = userBalances?.find(
            (value) => value.assetId === e.assetId,
          );
          return {
            ...e,
            free_balance: tokenBalance?.free_balance ?? "0",
            onChainBalance: tokenBalance?.onChainBalance ?? "0",
            reserved_balance: tokenBalance?.reserved_balance ?? "0",
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
    [filters.search, list, userBalances, filters.hideZero],
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={onClose}
        style={{ position: "relative", zIndex: 100 }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <S.Overlay />
        </Transition.Child>
        <S.Modal>
          <S.ModalWrapper>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <S.ModalPanel>
                <S.ModalTitle>
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
                  <S.ModalContentTable>
                    <AssetsTable assets={assets} />
                  </S.ModalContentTable>
                </S.ModalContent>
              </S.ModalPanel>
            </Transition.Child>
          </S.ModalWrapper>
        </S.Modal>
      </Dialog>
    </Transition>
  );
};
