import Head from "next/head";
import {
  AssetsInteraction,
  Header,
  Menu,
  CustomDeposit,
  CustomWithdraw,
  CustomTransfer,
} from "@polkadex/orderbook-ui/organisms";
import {
  EmptyMyAccount,
  Footer,
  Switch,
} from "@polkadex/orderbook-ui/molecules";
import { useTranslation } from "next-i18next";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as S from "./styles";
import { useTransfer } from "./useTransfer";

export const TransferTemplate = () => {
  const { t } = useTranslation("transfer");
  const { t: tc } = useTranslation("common");

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

  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();

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

  const RenderComponent = customComponent[type];

  const hasSelectedAccount = {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
  };

  const userExists = Boolean(tradeAddress?.length > 0);

  return (
    <>
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
                <S.Title show={userExists}>
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
              {userExists ? (
                RenderComponent
              ) : (
                <EmptyMyAccount balances hasLimit {...hasSelectedAccount} />
              )}
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
