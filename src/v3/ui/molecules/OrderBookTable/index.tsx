import * as S from "./styles";

import { OrderbookPricing, OrderbookTable } from "@polkadex/orderbook/v2/ui/organisms";
import { useOrderbook } from "@polkadex/orderbook/v2/hooks";

const OrderBookTable = ({ lightMode = false, filterBy }) => {
  const { isPriceUp, hasMarket, asks, bids, lastPriceValue } = useOrderbook();

  return (
    <S.Wrapper filterBy={filterBy}>
      <OrderbookTable orders={asks} isSell lightMode={lightMode} />
      {hasMarket && (
        <OrderbookPricing price={lastPriceValue} isPriceUp={isPriceUp} hasFilter={false} />
      )}
      <OrderbookTable orders={bids} lightMode={lightMode} />
    </S.Wrapper>
  );
};

export default OrderBookTable;
