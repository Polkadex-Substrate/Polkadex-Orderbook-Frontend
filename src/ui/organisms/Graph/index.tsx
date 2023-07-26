import Script from "next/script";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { OrderBook } from "@polkadex/orderbook-ui/organisms";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

const TradingView = dynamic(
  () => import("@polkadex/orderbook-ui/molecules").then((mod) => mod.TradingView),
  {
    ssr: false,
  }
);

export const Graph = () => {
  const { theme } = useSettingsProvider();

  return (
    <>
      <Script src="/static/datafeeds/udf/dist/bundle.js" strategy="lazyOnload" />
      <S.Wrapper isLightMode={theme === "light"}>
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
