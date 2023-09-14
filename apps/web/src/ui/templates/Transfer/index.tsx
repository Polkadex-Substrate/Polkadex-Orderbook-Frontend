import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  AssetsInteraction,
  Header,
  Menu,
  TransferForm,
  DepositHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Footer } from "@polkadex/orderbook-ui/molecules";
import { useEffect, useMemo, useState } from "react";
import { filterBlockedAssets } from "@orderbook/core/helpers";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";

import * as S from "./styles";
import * as T from "./types";

export const TransferTemplate = () => {
  const { list } = useAssetsProvider();
  const { balances } = useBalancesProvider();

  const { t } = useTranslation("transfer");
  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);

  const filteredNonBlockedAssets = useMemo(
    () =>
      filterBlockedAssets(list)?.map((e) => {
        const tokenBalance = balances?.find(
          (value) => value.assetId === e.assetId,
        );
        return {
          ...e,
          availableBalance: tokenBalance?.onChainBalance,
        } as T.FilteredAssetProps;
      }),
    [list, balances],
  );

  const [selectedAsset, setSelectedAsset] = useState<T.FilteredAssetProps>();

  const onAssetsInteraction = () => setAssetsInteraction(!assetsInteraction);
  const onTransferInteraction = () => setIsDeposit(!isDeposit);

  const onChangeAsset = (asset: T.FilteredAssetProps) => {
    setSelectedAsset(asset);
    onAssetsInteraction();
  };

  useEffect(() => {
    if (!selectedAsset) setSelectedAsset(filteredNonBlockedAssets?.[0]);
  }, [selectedAsset, filteredNonBlockedAssets]);

  return (
    <>
      <AssetsInteraction
        open={assetsInteraction}
        selectedAssetId={selectedAsset?.assetId}
        onClose={onAssetsInteraction}
        onChangeAsset={onChangeAsset}
      />
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu open />
          <S.Wrapper>
            <S.ContainerMain>
              <S.Header>
                <h1>Transfer</h1>
                <h2>
                  Simply dummy text of the printing and typesetting industry.
                </h2>
              </S.Header>
              <S.Content>
                <S.Form>
                  <TransferForm
                    isDeposit={isDeposit}
                    onTransferInteraction={onTransferInteraction}
                    onOpenAssets={onAssetsInteraction}
                    selectedAsset={selectedAsset}
                  />
                </S.Form>
                <S.History>
                  <DepositHistory />
                </S.History>
              </S.Content>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
