import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderbook } from "@polkadex/orderbook/v2/hooks/useOrderbook";
import { useOrderbookTable } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { EmptyData } from "@orderbook/v2/ui/molecules";

const Orderbook = () => {
  const { isPriceUp, hasMarket, asks, bids, lastPriceValue } = useOrderbook();
  return (
    <S.Main>
      <AvailableMessage message="Soon">
        <S.Header>
          <h2>Orderbook</h2>
          <Dropdown header="">Testing</Dropdown>
        </S.Header>
      </AvailableMessage>
      <S.Content>
        <OrderbookTable orders={asks} isSell />
        <AvailableMessage message="Soon">
          {hasMarket && <OrderbookPricing price={lastPriceValue} isPriceUp={isPriceUp} />}
        </AvailableMessage>
        <OrderbookTable orders={bids} />
      </S.Content>
    </S.Main>
  );
};

export const OrderbookTable = ({
  isSell = false,
  orders = [],
  precision,
  lightMode,
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
      {orders.length ? (
        <S.Table isSell={isSell} ref={contentRef}>
          <S.Head lightMode={lightMode}>
            <S.CellHead>Price({quoteUnit})</S.CellHead>
            <S.CellHead>Amount({baseUnit})</S.CellHead>
            <S.CellHead>Cum({quoteUnit})</S.CellHead>
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
}) => (
  <S.Pricing>
    <S.PricingAsideLeft isPriceUp={isPriceUp}>
      <span>
        <Icon name="SingleArrowBottom" size="extraSmall" />
        <Decimal fixed={precision}>{price}</Decimal>
      </span>
    </S.PricingAsideLeft>
    {hasFilter && (
      <S.PricingAsideRight>
        <Icon name="OrderDesc" size="medium" />
      </S.PricingAsideRight>
    )}
  </S.Pricing>
);
export default Orderbook;
