import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  Header,
  Menu,
  TransferForm,
  WithdrawHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Footer } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const TransferTemplate = () => {
  const { t } = useTranslation("transfer");

  return (
    <>
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
                  <TransferForm />
                </S.Form>
                <S.History>
                  <h3>History</h3>
                  <S.HistoryWrapper>
                    <WithdrawHistory />
                  </S.HistoryWrapper>
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
