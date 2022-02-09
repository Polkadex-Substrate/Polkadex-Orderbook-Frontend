import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderbook } from "@polkadex/orderbook/v2/hooks/useOrderbook";
import { useOrderbookTable } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

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
  const contentRef = useRef(null);

  const {
    quoteUnit,
    baseUnit,
    valumeData,
    changeMarketPrice,
    priceFixed,
    amountFixed,
    total,
  } = useOrderbookTable({ isSell, orders, contentRef });

  return (
    <S.Table isSell={isSell} ref={contentRef}>
      <S.Head>
        <S.CellHead>Price({baseUnit})</S.CellHead>
        <S.CellHead>Amount({quoteUnit})</S.CellHead>
        <S.CellHead>Total({quoteUnit})</S.CellHead>
      </S.Head>
      <S.Body>
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
