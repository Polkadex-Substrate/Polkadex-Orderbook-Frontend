import * as S from "./styles";
import { Props } from "./types";

export const Popup = ({
  isVisible = false,
  onClose,
  size = "small",
  children,
  BottomPosition = false,
  isMessage = false,
}: Props) => (
  <S.Wrapper isVisible={isVisible}>
    <S.Container BottomPosition={BottomPosition}>
      <S.Content isMessage={isMessage} size={size} aria-hidden={!isVisible}>
        {children}
      </S.Content>
      <S.Overlay isMessage={isMessage} onClick={onClose} isVisible={isVisible} />
    </S.Container>
  </S.Wrapper>
);
