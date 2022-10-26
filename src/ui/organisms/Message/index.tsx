import { useDispatch, useSelector } from "react-redux";

import { Props } from "./types";
import * as S from "./styles";

import { MessageCard, Icon, Modal } from "@polkadex/orderbook-ui/molecules";
import { alertDelete, selectAlertState } from "@polkadex/orderbook-modules";

export const Message = ({ children }: Props) => {
  const dispatch = useDispatch();

  const alert = useSelector(selectAlertState);

  const handleClose = () => (alert.type === "Loading" ? undefined : dispatch(alertDelete()));
  return (
    <Modal open={alert.status} onClose={handleClose} placement="bottom left" isFullWidth>
      <S.Wrapper>
        <S.Container>
          <MessageCard
            icon={alert.type}
            title={alert.message.title}
            description={alert.message.description}>
            {children}
          </MessageCard>
          <S.Action onClick={handleClose}>
            <Icon name="Close" size="extraSmall" color="black" stroke="black" />
          </S.Action>
        </S.Container>
      </S.Wrapper>
    </Modal>
  );
};
