import { useEffect, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderbook } from "@polkadex/orderbook/v2/hooks/useOrderbook";
import { useOrderbookTable } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { mapValues } from "@polkadex/orderbook/v2/helpers";
import { accumulateVolume } from "@polkadex/web-helpers";

export const Orderbook = () => {
  const { hasMarket, asks, bids, lastPriceValue } = useOrderbook();

  return (
    <S.Main>
      <AvailableMessage message="Soon">
        <S.Header>
          <h2>Orderbook</h2>
          <Dropdown header="0.1000000">Testing</Dropdown>
        </S.Header>
      </AvailableMessage>
      <S.Content>
        <Table orders={asks} isSell />
        <AvailableMessage message="Soon">
          {hasMarket && <Pricing price={lastPriceValue} priceInFiat="0.00" />}
        </AvailableMessage>
        <Table orders={bids} />
      </S.Content>
    </S.Main>
  );
};

const Table = ({ isSell = false, orders = [] }: T.Props) => {
  const { quoteUnit, baseUnit, maxVolume, changeMarketPrice, priceFixed, amountFixed, total } =
    useOrderbookTable({ isSell, orders });

  const contentRef = useRef(null);

  /**
   * @description -Get Volume of ther orders
   */
  const valumeData = mapValues(maxVolume, accumulateVolume(orders));

  useEffect(() => {
    // Make sure the scroll is always down
    if (isSell && !!contentRef?.current)
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [isSell, contentRef, orders]);

  return (
    <S.Table isSell={isSell}>
      <S.Head>
        <S.CellHead>Price({baseUnit})</S.CellHead>
        <S.CellHead>Amount({quoteUnit})</S.CellHead>
        <S.CellHead>Total({quoteUnit})</S.CellHead>
      </S.Head>
      <S.Body ref={contentRef}>
        {orders.map((order, i) => {
          const [price, volume] = order;

          /**
           * @description -Get Row width based on the volume
           */
          const getRowWidth = (index: number) =>
            valumeData && valumeData.length ? `${valumeData[index].value}%` : "1%";

          return (
            <S.Card key={i} onClick={() => changeMarketPrice(i, isSell ? "asks" : "bids")}>
              <S.CardCell>
                <Decimal
                  key={i}
                  fixed={priceFixed}
                  thousSep=","
                  prevValue={orders[i + 1] ? orders[i + 1][0] : 0}>
                  {price}
                </Decimal>
              </S.CardCell>
              <S.CardCell>
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {volume}
                </Decimal>
              </S.CardCell>
              <S.CardCell>
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {total[i]}
                </Decimal>
              </S.CardCell>
              <S.CardVolume isSell={isSell} style={{ width: getRowWidth(i) }} />
            </S.Card>
          );
        })}
      </S.Body>
    </S.Table>
  );
};

const Pricing = ({ price, priceInFiat, isSell = false }) => (
  <S.Pricing>
    <S.PricingAsideLeft isSell={isSell}>
      <span>
        <Icon name={"SingleArrowBottom"} size="extraSmall" />
        {price}
      </span>
      <p>${priceInFiat}</p>
    </S.PricingAsideLeft>
    <S.PricingAsideRight>
      <Icon name="OrderDesc" size="medium" />
    </S.PricingAsideRight>
  </S.Pricing>
);
