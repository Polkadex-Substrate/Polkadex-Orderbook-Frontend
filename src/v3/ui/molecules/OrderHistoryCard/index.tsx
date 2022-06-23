import moment from "moment";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

const OrderHistoryCard = ({ isSell, orderSide, baseUnit, quoteUnit, data = [] }) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <S.Image isSell={isSell}>
          <Icon name={isSell ? "SellOrder" : "BuyOrder"} size="large" color="text" />
        </S.Image>
        <span>
          {quoteUnit}/{baseUnit}
        </span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Date</S.Tag>
      <S.ContainerFlex>{moment(new Date()).format("LLL")}</S.ContainerFlex>
    </S.Td>

    <S.Td>
      <S.Tag>Type</S.Tag>
      <S.ContainerFlex>
        <span>{orderSide}</span>
      </S.ContainerFlex>
    </S.Td>

    <S.Td>
      <S.Tag>Price</S.Tag>
      <span>{data[3].value}</span>
    </S.Td>

    <S.Td>
      <S.Tag>Total</S.Tag>
      <span>{data[4].value}</span>
    </S.Td>

    <S.Td>
      <S.Tag>Filled</S.Tag>
      <span>{data[5].value}</span>
    </S.Td>

    <S.Td>
      <S.Tag>Actions</S.Tag>
      <S.ContainerActions>
        <Icon name="Options" background="none" />
      </S.ContainerActions>
    </S.Td>
  </S.Tr>
);

export default OrderHistoryCard;
