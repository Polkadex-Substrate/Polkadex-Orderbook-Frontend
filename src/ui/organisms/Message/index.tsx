import { useDispatch, useSelector } from "react-redux";

import { Props } from "./types";
import * as S from "./styles";

import { MessageCard, Popup, Icon } from "@polkadex/orderbook-ui/molecules";
import { alertDelete, selectAlertState } from "@polkadex/orderbook-modules";

export const Message = ({ children }: Props) => {
  const dispatch = useDispatch();

  const alert = useSelector(selectAlertState);

  const handleClose = () => dispatch(alertDelete());
  return (
    <Popup
      isMessage
      isVisible={alert.status}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={alert.type === "Loading" ? () => {} : handleClose}
      isBottomPosition
      size="full">
      <S.Wrapper>
        <S.Container>
          <MessageCard
            icon={alert.type}
            title={alert.message.title}
            description={alert.message.description}>
            {children}
          </MessageCard>
          <S.Action onClick={handleClose}>
            <Icon name="Close" size="extraSmall" color="black" />
          </S.Action>
        </S.Container>
      </S.Wrapper>
    </Popup>
  );
};
