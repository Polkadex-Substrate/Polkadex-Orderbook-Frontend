import * as S from "./styles";
import * as F from "./fakeData";

import { Dropdown } from "@polkadex/orderbook-ui/molecules";

export const RecentTrades = ({ isFull = false }) => {
  return (
    <S.Main isFull={isFull}>
      <S.Header>
        <h2>Recent Trades</h2>
        <Dropdown header="0.1000000">Testing</Dropdown>
      </S.Header>
      <S.Content>
        <S.Table>
          <S.Head>
            <S.CellHead>Price(DOT)</S.CellHead>
            <S.CellHead>Amount(PDEX)</S.CellHead>
            <S.CellHead>Date</S.CellHead>
          </S.Head>
          <S.Body>
            {F.orders.map((order) => {
              return (
                <Card
                  key={order.id}
                  price={order.price}
                  amount={order.amount}
                  date={order.date}
                  isSell={order.isSell}
                />
              );
            })}
          </S.Body>
        </S.Table>
      </S.Content>
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
