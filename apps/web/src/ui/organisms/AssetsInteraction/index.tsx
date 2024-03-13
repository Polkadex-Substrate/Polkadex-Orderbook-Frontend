import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useAssets } from "@orderbook/core/hooks";
import { useRouter } from "next/router";

import { AssetsTable } from "../AssetsTable";

import { AssetsTableSkeleton } from "./skeleton";
import * as S from "./styles";

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
  onClose: () => void;
  onChangeAsset: (e: FilteredAssetProps) => void;
}) => {
  const { t } = useTranslation("transfer");

  const { locale } = useRouter();
  const { assets, filters, loading, onHideZeroBalance, onSearchToken } =
    useAssets(locale);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        open={open}
        onClose={onClose}
        style={{ position: "relative", zIndex: 1000000 }}
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
                  <h3>{t("assetsInteraction.heading")}</h3>
                  <S.ModalContentHeader>
                    <Checkbox
                      checked={filters.hideZero}
                      onChange={onHideZeroBalance}
                      labelProps={{ style: { whiteSpace: "nowrap" } }}
                    >
                      {t("assetsInteraction.filterBalance")}
                    </Checkbox>
                    <Search
                      value={filters.search}
                      onChange={onSearchToken}
                      hasBorder={false}
                      placeholder={t("searchPlaceholder")}
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
