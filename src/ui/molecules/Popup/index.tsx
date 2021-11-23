import { Portal } from "..";

import * as S from "./styles";
import { Props } from "./types";

export const Popup = ({
  isVisible = false,
  onClose,
  size = "small",
  children,
  isBottomPosition = false,
  isMessage = false,
}: Props) => (
  <Portal>
    <S.Wrapper isMessage={isMessage} isVisible={isVisible}>
      <S.Container isBottomPosition={isBottomPosition}>
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
