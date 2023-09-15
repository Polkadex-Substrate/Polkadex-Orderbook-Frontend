import {
  OrderbookPricing,
  OrderbookTable,
} from "@polkadex/orderbook-ui/organisms";

import * as S from "./styles";

export const OrderBookTable = ({
  lightMode = false,
  filterBy,
  isPriceUp,
  hasMarket,
  asks,
  bids,
  lastPriceValue,
  precision,
  loading,
}) => {
  return (
    <S.Wrapper filterBy={filterBy}>
      <OrderbookTable
        precision={precision}
        orders={asks}
        isSell
        lightMode={lightMode}
        loading={loading}
      />

      <OrderbookPricing
        price={lastPriceValue}
        isPriceUp={isPriceUp}
        hasFilter={false}
        precision={precision}
        loading={!hasMarket || loading}
      />

      <OrderbookTable
        precision={precision}
        orders={bids}
        lightMode={lightMode}
        loading={loading}
      />
    </S.Wrapper>
  );
};
