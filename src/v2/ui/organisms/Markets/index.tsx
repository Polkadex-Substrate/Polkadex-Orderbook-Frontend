import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
export const Markets = () => {
  return (
    <S.Main>
      <Header />
      <Content />
      <Footer />
    </S.Main>
  );
};

export const Header = () => (
  <S.Header>
    <S.HeaderAsideLeft>
      <S.HeaderToken>
        <Icon isToken name="DOT" size="large" color="inverse" />
      </S.HeaderToken>
      <S.HeaderInfo>
        <S.HeaderInfoContainer>
          <span>DOT/PDEX</span>
          <S.HeaderInfoActions>
            <Icon name="Exchange" />
          </S.HeaderInfoActions>
        </S.HeaderInfoContainer>
        <p>Polkadot</p>
      </S.HeaderInfo>
    </S.HeaderAsideLeft>
    <S.HeaderAsideCenter>
      <img src="/img/graphTest.svg" alt="" />
    </S.HeaderAsideCenter>
    <S.HeaderAsideRight>
      <Icon name="ArrowBottom" stroke="inverse" />
    </S.HeaderAsideRight>
  </S.Header>
);

export const Content = () => (
  <S.Content>
    <S.Title>
      <h2>Markets</h2>
      <S.TitleActions>
        <S.TitleActionCard>
          <Icon name="Search" size="extraSmall" stroke="inverse" />
        </S.TitleActionCard>
        <S.TitleActionCard>
          <Icon name="Star" size="extraSmall" stroke="inverse" />
        </S.TitleActionCard>
      </S.TitleActions>
    </S.Title>
    <S.Container>
      <S.ContainerTitle></S.ContainerTitle>
      <S.ContainerWrapper>
        <Card
          pair="DOT"
          tokenTicker="PDEX"
          vol="32,875.081"
          price="2.180000"
          fiat="32.28"
          change="21.00"
        />
        <Card
          pair="UNI"
          tokenTicker="UNI"
          vol="32,875.081"
          price="2.180000"
          fiat="39.21"
          change="10.99"
          isNegative
        />
        <Card
          pair="ETH"
          tokenTicker="ETH"
          vol="32,875.081"
          price="2.180000"
          fiat="2,022.28"
          change="1.09"
          isNegative
        />
        <Card
          pair="PDEX"
          tokenTicker="PDEX"
          vol="32,875.081"
          price="8.5890"
          fiat="32.28"
          change="3.98"
        />
        <Card
          pair="USDT"
          tokenTicker="USDT"
          vol="32,875.081"
          price="1.00000"
          fiat="1.00000"
          change="1.09"
          isNegative
        />
        <Card
          pair="Link"
          tokenTicker="LINK"
          vol="32,875.081"
          price="8.5890"
          fiat="18.01"
          change="2.03"
        />
        <Card
          pair="ETH"
          tokenTicker="ETH"
          vol="32,875.081"
          price="2.180000"
          fiat="2,022.28"
          change="1.09"
          isNegative
        />
        <Card
          pair="PDEX"
          tokenTicker="PDEX"
          vol="32,875.081"
          price="8.5890"
          fiat="32.28"
          change="3.98"
        />
        <Card
          pair="USDT"
          tokenTicker="USDT"
          vol="32,875.081"
          price="1.00000"
          fiat="1.00000"
          change="1.09"
          isNegative
        />
        <Card
          pair="Link"
          tokenTicker="LINK"
          vol="32,875.081"
          price="8.5890"
          fiat="18.01"
          change="2.03"
        />
      </S.ContainerWrapper>
    </S.Container>
  </S.Content>
);

const Card = ({
  pair = "DOT",
  tokenTicker = "PDEX",
  vol = "32,875.081",
  price = "2.180000",
  fiat = "32.28",
  change = "81.10",
  isNegative = false,
}) => (
  <S.Card>
    <S.CardInfo>
      <S.CardToken>
        <Icon isToken name={tokenTicker} size="large" color="inverse" />
      </S.CardToken>
      <S.CardInfoWrapper>
        <span>
          {tokenTicker}/<small>{pair}</small>
        </span>
        <p>Vol:{vol}</p>
      </S.CardInfoWrapper>
    </S.CardInfo>
    <S.CardPricing>
      <span>{price}</span>
      <p>{fiat}</p>
    </S.CardPricing>
    <S.CardChange isNegative={isNegative}>
      <span>{change}</span>
    </S.CardChange>
  </S.Card>
);

export const Footer = () => (
  <S.Footer>
    <S.FooterCard isActive>Pdex</S.FooterCard>
    <S.FooterCard>Btc</S.FooterCard>
    <S.FooterCard>Usdt</S.FooterCard>
    <S.FooterCard>
      <Dropdown header="ALTS">
        <p>ETH</p>
        <p>SOL</p>
        <p>DOGE</p>
      </Dropdown>
    </S.FooterCard>
    <S.FooterCard>
      <Dropdown header="FIAT">
        <p>USDC</p>
        <p>CUSD</p>
        <p>EURT</p>
      </Dropdown>
    </S.FooterCard>
    <S.FooterCard>
      <Dropdown header="ZONES">
        <p>DEFI</p>
        <p>FINANCE</p>
        <p>NFT</p>
      </Dropdown>
    </S.FooterCard>
  </S.Footer>
);
