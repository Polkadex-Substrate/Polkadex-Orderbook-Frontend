import * as S from "./styles";

import { OrderbookPricing, OrderbookTable } from "@polkadex/orderbook/v2/ui/organisms";

const OrderBookTable = ({ lightMode = false, filterBy, isPriceUp, hasMarket, asks, bids, lastPriceValue, precision }) => {
  return (
    <S.Wrapper filterBy={filterBy}>
      <OrderbookTable precision={precision} orders={asks} isSell lightMode={lightMode} />
      {hasMarket && (
        <OrderbookPricing price={lastPriceValue} isPriceUp={isPriceUp} hasFilter={false} />
      )}
      <OrderbookTable precision={precision} orders={bids} lightMode={lightMode} />
    </S.Wrapper>
  );
};

export default OrderBookTable;
