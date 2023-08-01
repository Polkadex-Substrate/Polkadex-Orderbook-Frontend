import Head from "next/head";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Progress = () => {
  const { t } = useTranslation("migration");

  return (
    <S.Wrapper>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <S.Container>
        <S.Header>
          <OrderbookLogo />
        </S.Header>
        <S.Content>
          <S.Hero>
            <S.HeroHeader>
              <S.HeroTitle>
                <Icons.Candle />
              </S.HeroTitle>
              <S.HeroContent>
                <h3>Test trading?</h3>
                <p>
                  If you’d like to check it out and start trading, please visit{" "}
                  <a href="/" target="_blank">
                    the ambassador
                  </a>{" "}
                  or{" "}
                  <a href="/" target="_blank">
                    validator channels on Discord
                  </a>
                  .
                </p>
              </S.HeroContent>
            </S.HeroHeader>
            <S.HeroInteraction>
              <img src="/img/orderbookTesting.svg" alt="" />
            </S.HeroInteraction>
          </S.Hero>
          <S.Footer>
            <S.FooterWrapper>
              <S.FooterTitle>
                <h1>Almost there, Polkadexers</h1>
                <p>
                  Polkadex Orderbook is now running on the Polkadex mainnet in private beta
                  mode.
                </p>
              </S.FooterTitle>
              <S.FooterContent>
                <span>What this means</span>
                <S.FooterFlex>
                  <Card checked>
                    <strong>Orderbook and THEA are live</strong> on the Polkadex network.
                  </Card>
                  <Card checked>
                    DOT and USDT from the Relay Chain and AssetHub can now be deposited to
                    Polkadex via the Polkadex parachain and traded on Polkadex Orderbook.
                  </Card>
                  <Card checked>
                    Polkadex validators and ambassadors can now start making trades with real
                    assets.
                  </Card>
                  <Card>Market making has not yet gone live.</Card>
                  <Card>
                    Trade orders are currently only placed and filled by Polkadex ambassadors
                    and validators (aka individual traders).
                  </Card>
                </S.FooterFlex>
              </S.FooterContent>
            </S.FooterWrapper>
          </S.Footer>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

const Card = ({ checked = false, children }) => (
  <S.FooterCard checked={checked}>
    <div>{checked && <Icons.Checked />}</div>
    <p> {children}</p>
  </S.FooterCard>
);
