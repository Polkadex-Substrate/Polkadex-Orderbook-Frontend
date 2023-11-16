import Script from "next/script";
import dynamic from "next/dynamic";
import { OrderBook } from "@polkadex/orderbook-ui/organisms";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import * as S from "./styles";

const TradingView = dynamic(
  () =>
    import("@polkadex/orderbook-ui/molecules").then((mod) => mod.TradingView),
  {
    ssr: false,
  }
);

type Props = {
  market: string;
};

export const Graph = ({ market }: Props) => {
  const { theme } = useSettingsProvider();
  return (
    <>
      <Script src="/datafeeds/udf/dist/bundle.js" strategy="lazyOnload" />
      <S.Wrapper isLightMode={theme === "light"}>
        <S.WrapperGraph>
          <S.ChartWrapper>
            <TradingView market={market} />
          </S.ChartWrapper>
        </S.WrapperGraph>
        <OrderBook />
      </S.Wrapper>
    </>
  );
};
