import {
  OrderbookPricing,
  OrderbookTable,
} from "@polkadex/orderbook-ui/organisms";
import { Props } from "@polkadex/orderbook-ui/organisms/Orderbook/types";

import * as S from "./styles";

type OrderBookTableProps = {
  filterBy: string;
  hasMarket: boolean;
  lastPriceValue?: number;
  isPriceUp: boolean;
} & Omit<Props, "orders" | "isSell">;

export const OrderBookTable = ({
  lightMode = false,
  filterBy,
  isPriceUp,
  hasMarket,
  asks,
  bids,
  lastPriceValue,
  pricePrecision,
  qtyPrecision,
  loading,
  baseUnit,
  quoteUnit,
  market,
}: OrderBookTableProps) => {
  return (
    <S.Wrapper filterBy={filterBy}>
      <OrderbookTable
        pricePrecision={pricePrecision}
        qtyPrecision={qtyPrecision}
        orders={asks}
        isSell
        lightMode={lightMode}
        loading={loading}
        baseUnit={baseUnit}
        quoteUnit={quoteUnit}
        market={market}
        asks={asks}
        bids={bids}
      />

      <OrderbookPricing
        price={lastPriceValue}
        isPriceUp={isPriceUp}
        hasFilter={false}
        precision={pricePrecision}
        loading={!hasMarket || loading}
      />

      <OrderbookTable
        pricePrecision={pricePrecision}
        qtyPrecision={qtyPrecision}
        orders={bids}
        lightMode={lightMode}
        loading={loading}
        baseUnit={baseUnit}
        quoteUnit={quoteUnit}
        market={market}
        asks={asks}
        bids={bids}
      />
    </S.Wrapper>
  );
};
