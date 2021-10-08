import { useRouter } from "next/router";
import { useState } from "react";

import {
  Header,
  MarketChart,
  Orderbook,
  MarketTrade,
  Transactions,
  PlaceOrder,
  TransferInteraction,
  Popup,
} from "src/ui";
import * as S from "src/styles/home/trading";
import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  useWalletsFetch,
} from "src/hooks";

const Trading = () => {
  const router = useRouter();
  const { id } = router.query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useDepthMarketsFetch();
  useWalletsFetch(); // Testing..
  const [state, setState] = useState(true);
  if (!id) return <div />;
  return (
    <S.Main>
      {/* <Popup isVisible={state} size="xxSmall" onClose={() => setState(!state)}>
        <TransferInteraction onClose={() => setState(!state)} />
      </Popup> */}
      <Header />
      <S.Wrapper>
        <MarketChart />
        <Orderbook />
        <MarketTrade />
        <Transactions />
        <PlaceOrder />
      </S.Wrapper>
    </S.Main>
  );
};

export default Trading;
