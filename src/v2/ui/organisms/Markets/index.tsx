import * as S from "./styles";
import * as F from "./fakeData";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
export const Markets = ({ isFull = false }) => {
  return (
    <S.Main isFull={isFull}>
      <S.HeaderWrapper>
        <HeaderMarket />
      </S.HeaderWrapper>
      <Filters />
      <Content />
      <Footer />
    </S.Main>
  );
};

export const HeaderMarket = () => (
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
export const Filters = () => (
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
);

export const Content = () => {
  return (
    <S.Content>
      <S.ContainerTitle></S.ContainerTitle>
      <S.ContainerWrapper>
        {F.tokens.map((token) => (
          <Card
            key={token.id}
            pair={token.pair}
            tokenTicker={token.tokenTicker}
            vol={token.vol}
            price={token.price}
            fiat={token.fiat}
            change={token.change}
          />
        ))}
      </S.ContainerWrapper>
    </S.Content>
  );
};

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
      <S.CardInfoActions>
        <Icon name="Star" size="extraSmall" stroke="inverse" />
      </S.CardInfoActions>
      <S.CardInfoContainer>
        <S.CardToken>
          <Icon isToken name={tokenTicker} size="large" color="inverse" />
        </S.CardToken>
        <S.CardInfoWrapper>
          <span>
            {tokenTicker}/<small>{pair}</small>
          </span>
          <p>Vol:{vol}</p>
        </S.CardInfoWrapper>
      </S.CardInfoContainer>
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
