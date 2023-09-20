import Head from "next/head";
import {
  AssetsInteraction,
  Header,
  Menu,
  CustomDeposit,
  CustomWithdraw,
  CustomTransfer,
} from "@polkadex/orderbook-ui/organisms";
import { Footer, Switch } from "@polkadex/orderbook-ui/molecules";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import { useTransfer } from "./useTransfer";

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

  const customComponent = {
    deposit: (
      <CustomDeposit
        selectedAsset={selectedAsset}
        onOpenAssets={onAssetsInteraction}
        onChangeType={() =>
          onChangeType(type === "deposit" ? "withdraw" : "deposit")
        }
      />
    ),
    withdraw: (
      <CustomWithdraw
        selectedAsset={selectedAsset}
        onOpenAssets={onAssetsInteraction}
        onChangeType={() =>
          onChangeType(type === "withdraw" ? "deposit" : "withdraw")
        }
      />
    ),
    transfer: (
      <CustomTransfer
        selectedAsset={selectedAsset}
        onOpenAssets={onAssetsInteraction}
        onDisableSwitch={onDisableSwitch}
        switchEnable={switchEnable}
      />
    ),
  };

  const RenderComponent = () => customComponent[type];

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
              <RenderComponent />
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
