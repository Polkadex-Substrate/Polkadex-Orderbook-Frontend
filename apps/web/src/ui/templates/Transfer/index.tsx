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
import { useTranslation } from "next-i18next";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMemo } from "react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ConnectWalletInteraction } from "../ConnectWalletInteraction";
import { ConnectTradingInteraction } from "../ConnectTradingInteraction";

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
  const { selectedWallet } = useConnectWalletProvider();
  const { onHandleError } = useSettingsProvider();

  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const userExists = Boolean(tradeAddress?.length > 0);
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  const customComponent = {
    deposit: (
      <CustomDeposit
        selectedAsset={selectedAsset}
        onOpenAssets={onAssetsInteraction}
        onChangeType={() => {
          if (!userExists) {
            onHandleError(t("withdrawalError"));
            return;
          }
          onChangeType(type === "deposit" ? "withdraw" : "deposit");
        }}
        hasUser={userExists}
        fundWalletPresent={fundWalletPresent}
      />
    ),
    withdraw: (
      <CustomWithdraw
        selectedAsset={selectedAsset}
        onOpenAssets={onAssetsInteraction}
        onChangeType={() =>
          onChangeType(type === "withdraw" ? "deposit" : "withdraw")
        }
        hasUser={userExists}
        fundWalletPresent={fundWalletPresent}
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

  const RenderComponent = customComponent[type];

  return (
    <>
      <ConnectWalletInteraction />
      <ConnectTradingInteraction />
      <AssetsInteraction
        open={assetsInteraction}
        selectedAssetId={selectedAsset?.id}
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
                <S.Title show={fundWalletPresent}>
                  <Switch
                    disable={loading || switchEnable || !fundWalletPresent}
                    isActive={type === "transfer"}
                    onChange={() =>
                      onChangeType(type === "transfer" ? "deposit" : "transfer")
                    }
                  />
                  <span>{t("switcher")}</span>
                </S.Title>
              </S.Header>
              {RenderComponent}
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
