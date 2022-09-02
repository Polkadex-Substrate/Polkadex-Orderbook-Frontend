import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderbookTable } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { EmptyData } from "@orderbook/v2/ui/molecules";

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
