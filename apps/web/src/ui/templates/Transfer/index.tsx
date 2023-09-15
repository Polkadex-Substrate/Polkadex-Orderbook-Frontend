import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  AssetsInteraction,
  Header,
  Menu,
  DepositHistory,
  TransferFormDeposit,
  TransferFormWithdraw,
  WithdrawHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Footer, Loading, Switch } from "@polkadex/orderbook-ui/molecules";
import { useEffect, useMemo, useState } from "react";
import { filterBlockedAssets } from "@orderbook/core/helpers";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";

import * as S from "./styles";
import * as T from "./types";

export const TransferTemplate = () => {
  const { list } = useAssetsProvider();
  const { balances } = useBalancesProvider();
  const { loading: depositLoading } = useDepositProvider();
  const { loading: withdrawLoading } = useWithdrawsProvider();

  const { t } = useTranslation("transfer");
  const [otherPolkadexAccount, setOtherPolkadexAccount] = useState(false);
  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);

  const filteredNonBlockedAssets = useMemo(
    () =>
      filterBlockedAssets(list)?.map((e) => {
        const tokenBalance = balances?.find(
          (value) => value.assetId === e.assetId
        );
        return {
          ...e,
          availableBalance: tokenBalance?.onChainBalance,
        } as T.FilteredAssetProps;
      }),
    [list, balances]
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
                <Loading
                  style={{ maxWidth: "100rem" }}
                  isVisible={depositLoading || withdrawLoading}
                  hasBg={false}
                  message=""
                  spinner="Keyboard"
                >
                  <S.Form>
                    <S.Title>
                      <Switch
                        isActive={otherPolkadexAccount}
                        onChange={() =>
                          setOtherPolkadexAccount(!otherPolkadexAccount)
                        }
                      />
                      <span>Transfer for other Polkadex accounts</span>
                    </S.Title>
                    <S.Container>
                      {isDeposit && !otherPolkadexAccount ? (
                        <TransferFormDeposit
                          onTransferInteraction={onTransferInteraction}
                          onOpenAssets={onAssetsInteraction}
                          selectedAsset={selectedAsset}
                        />
                      ) : (
                        <TransferFormWithdraw
                          onTransferInteraction={onTransferInteraction}
                          onOpenAssets={onAssetsInteraction}
                          selectedAsset={selectedAsset}
                          otherPolkadexAccount={otherPolkadexAccount}
                        />
                      )}
                    </S.Container>
                  </S.Form>
                </Loading>

                <S.History>
                  {!isDeposit && !otherPolkadexAccount ? (
                    <DepositHistory />
                  ) : (
                    <WithdrawHistory selectedAsset={selectedAsset} />
                  )}
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
