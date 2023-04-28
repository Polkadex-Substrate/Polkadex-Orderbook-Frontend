import * as S from "./styles";
import * as T from "./types";
export const AvailableMessage = ({
  message = "Not available in Beta",
  color = "tertiaryBackground",
  children,
  isVisible = false,
  isPriority = false,
  ...props
}: T.Props) => (
  <S.Wrapper {...props}>
    {children}
    <S.Container color={color} isVisible={isVisible} isPriority={isPriority}>
      <p>{message}</p>
    </S.Container>
  </S.Wrapper>
);
