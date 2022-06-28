import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export type Props = {
  data: any;
};
const OrderBookOrder = ({ data }: Props) => (
  <S.Tr>
    <S.Td>{data.price}</S.Td>
    <S.Td>
      <S.ContainerFlex>
        <S.Span sell={data.side === "sell"}>
          {data.amount} {data.coin}
        </S.Span>
        <S.IconWrapper>
          <Icons.Exchange />
        </S.IconWrapper>
        <span>
          {data.total} {data.pair}
        </span>
      </S.ContainerFlex>
    </S.Td>
  </S.Tr>
);

export default OrderBookOrder;
