import Head from "next/head";
import {
  AssetsInteraction,
  Header,
  Menu,
  DepositHistory,
  TransferFormDeposit,
  TransferFormWithdraw,
  WithdrawHistory,
  TransferForm,
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
    type,
    onChangeType,
    switchEnable,
    onDisableSwitch,
  } = useTransfer();

  const formComponent = {
    withdraw: (
      <TransferFormWithdraw
        onTransferInteraction={() =>
          onChangeType(type === "withdraw" ? "deposit" : "withdraw")
        }
        onOpenAssets={onAssetsInteraction}
        selectedAsset={selectedAsset}
      />
    ),
    deposit: (
      <TransferFormDeposit
        onTransferInteraction={() =>
          onChangeType(type === "deposit" ? "withdraw" : "deposit")
        }
        onOpenAssets={onAssetsInteraction}
        selectedAsset={selectedAsset}
      />
    ),
    transfer: (
      <TransferForm
        onOpenAssets={onAssetsInteraction}
        selectedAsset={selectedAsset}
        onDisableSwitch={onDisableSwitch}
        switchEnable={switchEnable}
      />
    ),
  };

  const historyComponent = {
    withdraw: <WithdrawHistory selectedAsset={selectedAsset} />,
    deposit: <DepositHistory selectedAsset={selectedAsset} />,
    transfer: <TransferHistory selectedAsset={selectedAsset} />,
  };

  const FormComponent = () => formComponent[type];
  const HistoryComponent = () => historyComponent[type];

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
                <S.Heading>
                  <h1>{t("heading")}</h1>
                  <h2>{t("subheading")}</h2>
                </S.Heading>
                <S.Title>
                  <Switch
                    disable={loading || switchEnable}
                    isActive={type === "transfer"}
                    onChange={() =>
                      onChangeType(type === "transfer" ? "deposit" : "transfer")
                    }
                  />
                  <span>{t("switcher")}</span>
                </S.Title>
              </S.Header>
              <S.Content>
                <S.Form>
                  <S.Container>
                    <FormComponent />
                  </S.Container>
                </S.Form>
                <S.History>
                  <HistoryComponent />
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
