import Script from "next/script";
import { useState } from "react";

import * as S from "./styles";

import { OrderBook } from "@polkadex/orderbook-ui/organisms";
import { TradingView } from "@polkadex/orderbook-ui/molecules";

export const Graph = () => {
  const [isScriptReady, setIsScriptReady] = useState(false);

  return (
    <>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      <S.Wrapper>
        <S.WrapperGraph>
          <S.ChartWrapper>{isScriptReady && <TradingView />}</S.ChartWrapper>
        </S.WrapperGraph>
        <OrderBook />
      </S.Wrapper>
    </>
  );
};
