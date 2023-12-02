import { useRef, MouseEvent, MutableRefObject } from "react";
import { useTranslation } from "next-i18next";
import {
  Icon,
  EmptyData,
  OrderBookTable,
  OrderBookIcon,
  Heading,
  Dropdown,
  Skeleton,
} from "@polkadex/orderbook-ui/molecules";
import { useOrderbookTable, useOrderbook } from "@orderbook/core/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { MAX_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";

import * as T from "./types";
import * as S from "./styles";

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
    qtyPrecision,
  } = useOrderbook();

  return (
    <S.Wrapper>
      <S.WrapperTitle>
        <Heading title="Orderbook" />
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
                <Dropdown.Item
                  key={item.size}
                  onAction={() => handleAction(item)}
                >
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
        pricePrecison={sizeState.length}
        qtyPrecision={qtyPrecision}
        loading={loading}
      />
    </S.Wrapper>
  );
};

const allowedFields = ["Price", "Amount", "Sum", "Row"] as const;
type TableField = (typeof allowedFields)[number];

export const OrderbookTable = ({
  isSell = false,
  orders = [],
  pricePrecision = MAX_DIGITS_AFTER_DECIMAL,
  lightMode,
  loading,
  qtyPrecision = MAX_DIGITS_AFTER_DECIMAL,
}: T.Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    quoteUnit,
    baseUnit,
    valumeData,
    changeMarketPrice,
    changeMarketAmount,
    changeMarketAmountSumClick,
    total,
  } = useOrderbookTable({
    isSell,
    orders: [...orders],
    contentRef: contentRef as MutableRefObject<HTMLDivElement>,
  });

  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) =>
    translation(`orderBook.table.${key}`, args);

  const handleRowClick = (
    field: TableField,
    e: MouseEvent<HTMLElement>,
    selectedIndex: number
  ) => {
    if (field !== allowedFields[3]) e.stopPropagation();

    // If Price field is clicked
    if (field === allowedFields[0]) {
      changeMarketPrice(selectedIndex, isSell ? "asks" : "bids");
    }
    // If Amount field is clicked
    else if (field === allowedFields[1]) {
      changeMarketAmount(selectedIndex, isSell ? "asks" : "bids");
    }
    // If Total field is clicked
    else if (field === allowedFields[2]) {
      changeMarketAmountSumClick(selectedIndex);
    }
    // Clicked anywhere else (not exactly on any value)
    else if (field === allowedFields[3]) {
      changeMarketAmount(selectedIndex, isSell ? "asks" : "bids");
      changeMarketPrice(selectedIndex, isSell ? "asks" : "bids");
    }
  };

  return (
    <>
      {loading ? (
        <OrderbookSkeleton />
      ) : orders.length ? (
        <S.Table isSell={isSell} ref={contentRef}>
          <S.Head lightMode={lightMode}>
            <S.CellHead>{t("price", { price: quoteUnit })}</S.CellHead>
            <S.CellHead>{t("amount", { amount: baseUnit })}</S.CellHead>
            <S.CellHead>{t("sum", { sum: quoteUnit })}</S.CellHead>
          </S.Head>
          <S.Body isSell={isSell}>
            {orders.map((order, i) => {
              const [price, volume] = order;
              /**
               * @description -Get Row width based on the volume
               */
              const getRowWidth = (index: number) =>
                `${valumeData[index]?.value || 1}%`;

              return (
                <S.Card
                  key={i}
                  onClick={(e) => handleRowClick(allowedFields[3], e, i)}
                  isSell={isSell}
                >
                  <S.CardCell>
                    <span
                      onClick={(e) => handleRowClick(allowedFields[0], e, i)}
                    >
                      <Decimal
                        key={i}
                        fixed={pricePrecision}
                        thousSep=","
                        prevValue={orders[i + 1] ? orders[i + 1][0] : 0}
                      >
                        {price}
                      </Decimal>
                    </span>
                  </S.CardCell>
                  <S.CardCell>
                    <span
                      onClick={(e) => handleRowClick(allowedFields[1], e, i)}
                    >
                      <Decimal key={i} fixed={qtyPrecision} thousSep=",">
                        {volume}
                      </Decimal>
                    </span>
                  </S.CardCell>
                  <S.CardCell>
                    <span
                      onClick={(e) => handleRowClick(allowedFields[2], e, i)}
                    >
                      <Decimal key={i} fixed={pricePrecision} thousSep=",">
                        {total[i]}
                      </Decimal>
                    </span>
                  </S.CardCell>
                  <S.CardVolume
                    isSell={isSell}
                    style={{ width: getRowWidth(i) }}
                  />
                </S.Card>
              );
            })}
          </S.Body>
        </S.Table>
      ) : (
        <EmptyData
          image={isSell ? "emptyOrderbook" : "emptyOrderbookSell"}
          title={`${isSell ? t("noAsks") : t("noBids")}`}
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
        <Skeleton height=normalizeValue(2) width="50%" />
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
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
    <Skeleton height=normalizeValue(2) width="100%" />
  </S.Skeleton>
);
