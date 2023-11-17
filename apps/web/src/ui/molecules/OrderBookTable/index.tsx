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
  pricePrecison,
  qtyPrecision,
  loading,
  market,
}) => {
  return (
    <S.Wrapper filterBy={filterBy}>
      <OrderbookTable
        pricePrecision={pricePrecison}
        qtyPrecision={qtyPrecision}
        orders={asks}
        isSell
        lightMode={lightMode}
        loading={loading}
        market={market}
      />

      <OrderbookPricing
        price={lastPriceValue}
        isPriceUp={isPriceUp}
        hasFilter={false}
        precision={pricePrecison}
        loading={!hasMarket || loading}
      />

      <OrderbookTable
        pricePrecision={pricePrecison}
        qtyPrecision={qtyPrecision}
        orders={bids}
        lightMode={lightMode}
        loading={loading}
        market={market}
      />
    </S.Wrapper>
  );
};
