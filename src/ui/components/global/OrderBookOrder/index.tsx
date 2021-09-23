import * as S from "./styles";

const OrderBookOrder = ({ data }) => (
  <S.Tr>
    <S.Td>{data.price}</S.Td>
    <S.Td>
      <S.ContainerFlex>
        <S.Span sell={data.side === "sell"}>
          {data.amount} {data.coin}
        </S.Span>
        <S.Image src="/img/icons/Exchange.svg" />
        <span>
          {data.total} {data.pair}
        </span>
      </S.ContainerFlex>
    </S.Td>
  </S.Tr>
);

export default OrderBookOrder;
