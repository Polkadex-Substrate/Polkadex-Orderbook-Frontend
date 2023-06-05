import Script from "next/script";
import { useState } from "react";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { OrderBook } from "@polkadex/orderbook-ui/organisms";
import { Keyboard } from "@polkadex/orderbook-ui/molecules/LoadingIcons";

const TradingView = dynamic(
  () => import("@polkadex/orderbook-ui/molecules").then((mod) => mod.TradingView),
  {
    ssr: false,
  }
);

export const Graph = () => {
  return (
    <>
      <Script src="/static/datafeeds/udf/dist/bundle.js" strategy="lazyOnload" />
      <S.Wrapper>
        <S.WrapperGraph>
          <S.ChartWrapper>
            <TradingView />
          </S.ChartWrapper>
        </S.WrapperGraph>
        <OrderBook />
      </S.Wrapper>
    </>
  );
};
