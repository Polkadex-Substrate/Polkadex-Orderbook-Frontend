import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

const TradeHistoryCard = ({ isSell, orderSide, baseUnit, quoteUnit, data = [] }) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <S.Image isSell={isSell}>
          <Icon name={isSell ? "SellOrder" : "BuyOrder"} size="large" />
        </S.Image>
        <span>
          {quoteUnit}/{baseUnit}
        </span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Date</S.Tag>
      <S.ContainerFlex>{data[0].value}</S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Type</S.Tag>
      <S.ContainerFlex>
        <span>{orderSide}</span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Price</S.Tag>
      <span>{data[1].value}</span>
    </S.Td>
    <S.Td>
      <S.Tag>Quantity</S.Tag>
      <span>{data[2].value}</span>
    </S.Td>
  </S.Tr>
);

export default TradeHistoryCard;
