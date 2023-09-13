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
import { useState } from "react";

import * as S from "./styles";

export const TransferTemplate = () => {
  const { t } = useTranslation("transfer");
  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);

  const onAssetsInteraction = (value = false) => setAssetsInteraction(value);
  const onTransferInteraction = () => setIsDeposit(!isDeposit);

  return (
    <>
      <AssetsInteraction
        open={assetsInteraction}
        onClose={onAssetsInteraction}
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
                    onOpenAssets={() => onAssetsInteraction(true)}
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
