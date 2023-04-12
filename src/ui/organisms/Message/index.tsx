import { Props } from "./types";
import * as S from "./styles";

import { MessageCard, Icon, Modal } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const Message = ({ children }: Props) => {
  const { onAlertDelete, alert } = useSettingsProvider();

  const handleClose = () => (alert.type === "Loading" ? undefined : onAlertDelete());

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
