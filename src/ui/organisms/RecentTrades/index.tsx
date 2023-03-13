import * as S from "./styles";

import {
  AvailableMessage,
  ResultFound,
  Skeleton,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { useRecentTrades } from "@polkadex/orderbook/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { useRecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";

export const filters = ["all", "buy", "sell"];

export const RecentTrades = () => {
  const { state, isDecreasing, quoteUnit, baseUnit, pricePrecision, amountPrecision } =
    useRecentTradesProvider();
  const { list } = state;

  return (
    <S.MainContainer>
      <S.Main>
        <S.Header>
          <h2>Recent Trades</h2>
        </S.Header>
        {list.length ? (
          <>
            <S.Head>
              <S.CellHead>Price({quoteUnit})</S.CellHead>
              <S.CellHead>Amount({baseUnit})</S.CellHead>
              <S.CellHead>Time</S.CellHead>
            </S.Head>
            <S.Content>
              {list.map((order, i) => {
                const date = new Date(order.timestamp).toLocaleTimeString();
                return (
                  <Card
                    key={i}
                    price={Decimal.format(order.price, pricePrecision || 7, ",")}
                    amount={Decimal.format(order.amount, amountPrecision || 7, ",")}
                    date={date}
                    isSell={isDecreasing[i]}
                  />
                );
              })}
            </S.Content>
          </>
        ) : (
          <ResultFound>No recent trades</ResultFound>
        )}
      </S.Main>
    </S.MainContainer>
  );
};

const Card = ({ price, amount, date, isSell = false }) => (
  <S.Card isSell={isSell}>
    <S.CardCell>{price}</S.CardCell>
    <S.CardCell>{amount}</S.CardCell>
    <S.CardCell>{date}</S.CardCell>
  </S.Card>
);

export const RecentTradesSkeleton = () => (
  <Skeleton height="100%" width="100%" style={{ maxWidth: "350px" }} />
);
