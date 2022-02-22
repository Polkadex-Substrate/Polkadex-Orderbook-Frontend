import * as S from "./styles";

import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { useRecentTrades } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export const RecentTrades = () => {
  const { isDecreasing, recentTrades, quoteUnit, baseUnit, pricePrecision, amountPrecision } =
    useRecentTrades();
  return (
    <S.Main>
      {recentTrades.length ? (
        <>
          <AvailableMessage message="Soon">
            <S.Header>
              <h2>Recent Trades</h2>
              {/* <Dropdown header="0.1000000">Testing</Dropdown> */}
            </S.Header>
          </AvailableMessage>

          <S.Head>
            <S.CellHead>Price({quoteUnit})</S.CellHead>
            <S.CellHead>Amount({baseUnit})</S.CellHead>
            <S.CellHead>Date</S.CellHead>
          </S.Head>
          <>
            {recentTrades.map((order, i) => {
              const date = new Date(order.timestamp).toLocaleTimeString();
              return (
                <Card
                  key={i}
                  price={Decimal.format(order.price, pricePrecision, ",")}
                  amount={Decimal.format(order.amount, amountPrecision, ",")}
                  date={date}
                  isSell={isDecreasing[i]}
                />
              );
            })}
          </>
        </>
      ) : (
        <EmptyTrades />
      )}
    </S.Main>
  );
};

const Card = ({ price, amount, date, isSell = false }) => (
  <S.Card isSell={isSell}>
    <S.CardCell>{price}</S.CardCell>
    <S.CardCell>{amount}</S.CardCell>
    <S.CardCell>{date}</S.CardCell>
  </S.Card>
);
const EmptyTrades = () => (
  <S.Container>
    <S.Empty>
      <img src="/img/emptyTrade.svg" alt="Empty Trades" />
      <p>No Transactions</p>
    </S.Empty>
  </S.Container>
);
