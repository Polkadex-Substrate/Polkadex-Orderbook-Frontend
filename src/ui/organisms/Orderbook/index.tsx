import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import {
  Icon,
  EmptyData,
  OrderBookTable,
  OrderBookIcon,
  Heading,
  Dropdown,
  Skeleton,
} from "@polkadex/orderbook-ui/molecules";
import { useOrderbookTable, useOrderbook } from "@polkadex/orderbook/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";

export const OrderBook = () => {
  const {
    isPriceUp,
    hasMarket,
    asks,
    bids,
    lastPriceValue,
    sizeState,
    filterState,
    initialState,
    handleChange,
    handleAction,
    loading,
  } = useOrderbook();

  return (
    <S.Wrapper>
      <S.WrapperTitle>
        <Heading title="Order Book" />
        <S.ContainerTitle>
          <S.ContainerActions>
            <OrderBookIcon
              icon="OrderAsc"
              filterState={filterState}
              handleChange={handleChange}
            />
            <OrderBookIcon
              icon="Order"
              filterState={filterState}
              handleChange={handleChange}
            />
            <OrderBookIcon
              icon="OrderDesc"
              filterState={filterState}
              handleChange={handleChange}
            />
          </S.ContainerActions>
          <Dropdown>
            <Dropdown.Trigger>
              <S.SizeHeader>
                {sizeState.size}
                <div>
                  <Icons.ArrowBottom />
                </div>
              </S.SizeHeader>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="tertiaryBackground">
              {initialState.map((item) => (
                <Dropdown.Item key={item.size} onAction={() => handleAction(item)}>
                  {item.size}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </S.ContainerTitle>
      </S.WrapperTitle>
      <OrderBookTable
        lightMode
        filterBy={filterState}
        isPriceUp={isPriceUp}
        hasMarket={hasMarket}
        asks={asks}
        bids={bids}
        lastPriceValue={lastPriceValue}
        precision={sizeState.length}
        loading={loading}
      />
    </S.Wrapper>
  );
};

export const OrderbookTable = ({
  isSell = false,
  orders = [],
  precision,
  lightMode,
  loading,
}: T.Props) => {
  const contentRef = useRef(null);

  const {
    quoteUnit,
    baseUnit,
    valumeData,
    changeMarketPrice,
    priceFixed,
    amountFixed,
    total,
  } = useOrderbookTable({ isSell, orders: [...orders], contentRef });

  return (
    <>
      {loading ? (
        <OrderbookSkeleton />
      ) : orders.length ? (
        <S.Table isSell={isSell} ref={contentRef}>
          <S.Head lightMode={lightMode}>
            <S.CellHead>Price({quoteUnit})</S.CellHead>
            <S.CellHead>Amount({baseUnit})</S.CellHead>
            <S.CellHead>Sum({quoteUnit})</S.CellHead>
          </S.Head>
          <S.Body isSell={isSell}>
            {orders.map((order, i) => {
              const [price, volume] = order;
              /**
               * @description -Get Row width based on the volume
               */
              const getRowWidth = (index: number) => `${valumeData[index]?.value || 1}%`;

              return (
                <S.Card
                  key={i}
                  onClick={() => changeMarketPrice(i, isSell ? "asks" : "bids")}
                  isSell={isSell}>
                  <S.CardCell>
                    <Decimal
                      key={i}
                      fixed={precision}
                      thousSep=","
                      prevValue={orders[i + 1] ? orders[i + 1][0] : 0}>
                      {price}
                    </Decimal>
                  </S.CardCell>
                  <S.CardCell>
                    <Decimal key={i} fixed={precision} thousSep=",">
                      {volume}
                    </Decimal>
                  </S.CardCell>
                  <S.CardCell>
                    <Decimal key={i} fixed={precision} thousSep=",">
                      {total[i]}
                    </Decimal>
                  </S.CardCell>
                  <S.CardVolume isSell={isSell} style={{ width: getRowWidth(i) }} />
                </S.Card>
              );
            })}
          </S.Body>
        </S.Table>
      ) : (
        <EmptyData
          image={isSell ? "emptyOrderbook" : "emptyOrderbookSell"}
          title={`No ${isSell ? "Asks" : "Bids"}`}
          style={{ paddingBottom: 20 }}
        />
      )}
    </>
  );
};

export const OrderbookPricing = ({
  price,
  isPriceUp = false,
  hasFilter = true,
  precision,
  loading,
}) => (
  <S.Pricing>
    <S.PricingAsideLeft isPriceUp={isPriceUp}>
      {loading ? (
        <Skeleton height="2rem" width="50%" />
      ) : (
        <span>
          <Icon name="SingleArrowBottom" size="extraSmall" />
          <Decimal fixed={precision}>{price}</Decimal>
        </span>
      )}
    </S.PricingAsideLeft>
    {hasFilter && (
      <S.PricingAsideRight>
        <Icon name="OrderDesc" size="medium" />
      </S.PricingAsideRight>
    )}
  </S.Pricing>
);

export const OrderbookSkeleton = () => (
  <S.Skeleton>
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
    <Skeleton height="2rem" width="100%" />
  </S.Skeleton>
);
