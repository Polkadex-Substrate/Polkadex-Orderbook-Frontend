import * as S from "./styles";

export const AvailableMessage = ({
  message = "Not available in Beta",
  color = "tertiaryBackground",
  children,
  isVisible = false,
  isPriority = false,
  ...props
}) => (
  <S.Wrapper {...props}>
    {children}
    <S.Container color={color} isVisible={isVisible} isPriority={isPriority}>
      <p>{message}</p>
    </S.Container>
  </S.Wrapper>
);
