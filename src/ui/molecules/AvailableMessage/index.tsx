import * as S from "./styles";

export const AvailableMessage = ({
  message = "Not available in Beta",
  color = "tertiaryBackground",
  children,
}) => (
  <S.Wrapper>
    {children}
    <S.Container color={color}>
      <p>{message}</p>
    </S.Container>
  </S.Wrapper>
);
