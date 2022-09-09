import * as S from "./styles";
import { Props } from "./types";

import { Portal } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/Portal";

export const Popup = ({
  isVisible = false,
  onClose,
  size = "small",
  children,
  isBottomPosition = false,
  isRightPosition = false,
  isMessage = false,
  ...props
}: Props) => (
  <Portal>
    <S.Wrapper isMessage={isMessage} isVisible={isVisible}>
      <S.Container
        isBottomPosition={isBottomPosition}
        isRightPosition={isRightPosition}
        {...props}>
        <S.Content isMessage={isMessage} size={size} aria-hidden={!isVisible}>
          {children}
        </S.Content>
        <S.Overlay
          isMessage={isMessage}
          aria-hidden={!isVisible}
          onClick={onClose}
          isVisible={isVisible}
        />
      </S.Container>
    </S.Wrapper>
  </Portal>
);
