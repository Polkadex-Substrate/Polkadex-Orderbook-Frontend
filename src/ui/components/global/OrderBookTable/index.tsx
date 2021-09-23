import OrderBookOrder from "../OrderBookOrder";

import * as S from "./styles";

export type OrderBookTableProps = {
  active?: number;
  data: any;
};

const OrderBookTable = ({ active = 0, data }: OrderBookTableProps) => {
  const filterBy = (side) => data.filter((item) => item.side === side);

  return (
    <S.Wrapper>
      <S.Table>
        <S.Thead>
          <S.Tr>
            <S.Th>Price</S.Th>
            <S.Th>Amount</S.Th>
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {data && filterBy("buy").map((item) => <OrderBookOrder key={item.id} data={item} />)}
        </S.Tbody>
      </S.Table>

      <S.LastTransaction active={active}>
        <p>
          Latest transaction <span>{active} </span>
        </p>
      </S.LastTransaction>
      <S.Table>
        <S.Thead>
          <S.Tr>
            <S.Th>Price</S.Th>
            <S.Th>Amount</S.Th>
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {data &&
            filterBy("sell").map((item) => <OrderBookOrder key={item.id} data={item} />)}
        </S.Tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default OrderBookTable;
