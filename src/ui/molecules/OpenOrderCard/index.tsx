import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrders } from "@polkadex/orderbook/providers/user/orders";

export const OpenOrderCard = ({
  isSell,
  orderSide,
  orderType,
  orderId,
  base,
  quote,
  baseUnit,
  quoteUnit,
  data = [],
}) => {
  const dispatch = useDispatch();
  const ordersState = useOrders();
  const [isCancelClicked, setIsCancleClicked] = useState(false);
  const cancelLoading = ordersState.cancel.isLoading;

  const handleCancelClick = () => {
    if (!isCancelClicked) {
      setIsCancleClicked(true);
      ordersState.onCancelOrder({ orderId, base, quote });
    }
  };
  useEffect(() => {
    if (!cancelLoading) setIsCancleClicked(false);
  }, [cancelLoading]);

  return (
    <S.Tr>
      <S.Td>
        <S.Tag>Pair</S.Tag>
        <S.ContainerFlex>
          <S.Image isSell={isSell}>
            <Icon name={isSell ? "SellOrder" : "BuyOrder"} size="large" />
          </S.Image>
          <span>
            {baseUnit}/{quoteUnit}
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
          <span>{orderType}</span>
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
          <button type="button" onClick={handleCancelClick}>
            Cancel Order
          </button>
        </S.ContainerActions>
      </S.Td>
    </S.Tr>
  );
};
