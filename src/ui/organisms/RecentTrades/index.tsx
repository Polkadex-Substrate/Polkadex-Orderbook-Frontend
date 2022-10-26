import * as S from "./styles";

import {
  AvailableMessage,
  ResultFound,
  Skeleton,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { useRecentTrades } from "@polkadex/orderbook/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";

export const filters = ["all", "buy", "sell"];

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
        <S.Header>
          <h2>Recent Trades</h2>
          <AvailableMessage message="Soon">
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
                    <S.DropdownMenuItem>{value}</S.DropdownMenuItem>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </AvailableMessage>
        </S.Header>
        {recentTrades.length ? (
          <>
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
