import { useDispatch } from "react-redux";

import { getRamdom } from "../OriginalChart";

import * as S from "./styles";

import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { OrderbookPricing, OrderbookTable } from "@polkadex/orderbook/v2/ui/organisms";
import { useOrderbook } from "@polkadex/orderbook/v2/hooks";

const OrderBookTable = ({ lightMode = false }) => {
  const { isPriceUp, hasMarket, asks, bids, lastPriceValue } = useOrderbook();

  return (
    <S.Wrapper>
      <OrderbookTable orders={asks} isSell lightMode={lightMode} />
      <AvailableMessage message="Soon">
        {hasMarket && (
          <OrderbookPricing
            price={lastPriceValue}
            isPriceUp={isPriceUp}
            priceInFiat="0.00"
            hasFilter={false}
          />
        )}
      </AvailableMessage>
      <OrderbookTable orders={bids} lightMode={lightMode} />
    </S.Wrapper>
  );
};

export default OrderBookTable;
