import Head from "next/head";
import {
  AssetsInteraction,
  Header,
  Menu,
  DepositHistory,
  TransferFormDeposit,
  TransferFormWithdraw,
  WithdrawHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Footer, Switch } from "@polkadex/orderbook-ui/molecules";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import { useTransfer } from "./useTransfer";

import { TransferHistory } from "@/ui/organisms/TransferHistory";

export const TransferTemplate = () => {
  const { t } = useTranslation("transfer");

  const {
    loading,
    assetsInteraction,
    onAssetsInteraction,
    onChangeAsset,
    selectedAsset,
    onChangeIsDeposit,
    otherPolkadexAccount,
    onChangeOtherPolkadexAccount,
    isDeposit,
  } = useTransfer();

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
                <h1>{t("heading")}</h1>
                <h2>{t("subheading")}</h2>
              </S.Header>
              <S.Content>
                <S.Form>
                  <S.Title>
                    <Switch
                      disable={loading} // TODO: Check otherPollkadexAccountSelected loading
                      isActive={otherPolkadexAccount}
                      onChange={onChangeOtherPolkadexAccount}
                    />
                    <span>{t("switcher")}</span>
                  </S.Title>
                  <S.Container>
                    {isDeposit || otherPolkadexAccount ? (
                      <TransferFormDeposit
                        otherPolkadexAccount={otherPolkadexAccount}
                        onTransferInteraction={onChangeIsDeposit}
                        onOpenAssets={onAssetsInteraction}
                        selectedAsset={selectedAsset}
                      />
                    ) : (
                      <TransferFormWithdraw
                        onTransferInteraction={onChangeIsDeposit}
                        onOpenAssets={onAssetsInteraction}
                        selectedAsset={selectedAsset}
                      />
                    )}
                  </S.Container>
                </S.Form>
                <S.History>
                  {otherPolkadexAccount ? (
                    <TransferHistory selectedAsset={selectedAsset} />
                  ) : isDeposit ? (
                    <DepositHistory selectedAsset={selectedAsset} />
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
