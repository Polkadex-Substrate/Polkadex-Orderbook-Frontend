import * as S from "./styles";

import { OrderbookPricing, OrderbookTable } from "@polkadex/orderbook-ui/organisms";

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
      {hasMarket && (
        <OrderbookPricing
          price={lastPriceValue}
          isPriceUp={isPriceUp}
          hasFilter={false}
          precision={precision}
        />
      )}
      <OrderbookTable
        precision={precision}
        orders={bids}
        lightMode={lightMode}
        loading={loading}
      />
    </S.Wrapper>
  );
};
