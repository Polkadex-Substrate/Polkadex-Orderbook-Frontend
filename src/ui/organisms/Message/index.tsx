import { Props } from "./types";
import * as S from "./styles";

import { MessageCard, Popup, Icon } from "@polkadex/orderbook-ui/molecules";

export const Message = ({
  isVisible = false,
  onClose,
  type,
  title,
  description,
  children,
}: Props) => (
  <Popup
    isMessage
    isVisible={isVisible}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose={type === "Loading" ? () => {} : onClose}
    isBottomPosition
    size="full">
    <S.Wrapper>
      <S.Container>
        <MessageCard icon={type} title={title} description={description}>
          {children}
        </MessageCard>
        <S.Action onClick={onClose}>
          <Icon name="Close" size="extraSmall" color="black" />
        </S.Action>
      </S.Container>
    </S.Wrapper>
  </Popup>
);
