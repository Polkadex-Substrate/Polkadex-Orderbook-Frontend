import Link from "next/link";
import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { FlexCenter } from "@polkadex/orderbook-ui/atoms";

export const Tokens = () => {
  return (
    <S.Wrapper>
      <S.Title>
        <h2>Tokens</h2>
        <div>
          {/* <Icon name="Search" size="extraSmall" /> */}
          <input type="text" placeholder="Search.." />
        </div>
      </S.Title>
      <S.Content>
        <Card tokenName="Bitcoin" tokenTicker="BTC" amount={74.01} />
        <Card tokenName="Dash" tokenTicker="DASH" amount={74.01} />
        <Card tokenName="Polkadot" tokenTicker="DOT" amount={74.01} />
        <Card tokenName="Polkadex" tokenTicker="PDEX" amount={74.01} />
        <Card tokenName="Uniswap" tokenTicker="UNI" amount={74.01} />
        <Card tokenName="Tether" tokenTicker="USDT" amount={74.01} />
        <Card tokenName="ChainLink" tokenTicker="Link" amount={74.01} />
      </S.Content>
    </S.Wrapper>
  );
};

const Card = ({ tokenName, tokenTicker, amount, amountInFiat = 0.0 }: T.TokenProps) => {
  const router = useRouter();
  console.log(router);
  return (
    <Link href={tokenTicker}>
      <a>
        <S.Card isActive={router.query.id === tokenTicker}>
          <FlexCenter>
            <Icon
              isToken
              name={tokenTicker}
              size="giant"
              background="secondaryBackground"
              style={{ marginRight: "0.8rem" }}
            />
            <div>
              <span>{tokenName}</span>
              <p>{tokenTicker}</p>
            </div>
          </FlexCenter>
          <S.Aside>
            <span>{amount}</span>
            <p>~{amountInFiat} USD</p>
          </S.Aside>
        </S.Card>
      </a>
    </Link>
  );
};
