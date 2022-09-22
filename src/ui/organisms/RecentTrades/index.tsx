import * as S from "./styles";

import { Skeleton } from "@polkadex/orderbook-ui/molecules";
import { useRecentTrades } from "@polkadex/orderbook/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";

export const filters = ["All", "Buy", "Sell"];

export const RecentTrades = () => {
  const {
    isDecreasing,
    recentTrades,
    quoteUnit,
    baseUnit,
    pricePrecision,
    amountPrecision,
    filter,
    handleChangeFilter,
  } = useRecentTrades();

  return (
    <S.MainContainer>
      <S.Main>
        {recentTrades.length ? (
          <>
            <S.Header>
              <h2>Recent Trades</h2>
              <Dropdown>
                <Dropdown.Trigger>
                  <S.DropdownTrigger>
                    {filter} <Icons.ArrowBottom />
                  </S.DropdownTrigger>
                </Dropdown.Trigger>
                <Dropdown.Menu fill="secondaryBackgroundSolid">
                  {filters.map((value) => (
                    <Dropdown.Item
                      key={value}
                      onAction={() => handleChangeFilter({ filterBy: value })}>
                      {value}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </S.Header>
            <S.Head>
              <S.CellHead>Price({quoteUnit})</S.CellHead>
              <S.CellHead>Amount({baseUnit})</S.CellHead>
              <S.CellHead>Time</S.CellHead>
            </S.Head>
            <S.Content>
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
            </S.Content>
          </>
        ) : (
          <EmptyTrades />
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
const EmptyTrades = ({ message = "No Recent Trades" }) => (
  <S.Container>
    <S.Empty>
      <img src="/img/emptyTrade.svg" alt="Empty Trades" />
      <p>{message}</p>
    </S.Empty>
  </S.Container>
);
export const RecentTradesSkeleton = () => (
  <Skeleton height="100%" width="100%" style={{ maxWidth: "350px" }} />
);
