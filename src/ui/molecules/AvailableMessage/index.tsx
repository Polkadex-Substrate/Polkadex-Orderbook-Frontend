import * as S from "./styles";

export const AvailableMessage = ({
  message = "Not available in Beta",
  color = "tertiaryBackground",
  children,
  ...props
}) => (
  <S.Wrapper {...props}>
    {children}
    <S.Container color={color}>
      <p>{message}</p>
    </S.Container>
  </S.Wrapper>
);
