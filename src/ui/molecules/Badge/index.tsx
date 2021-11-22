import * as T from "./types";
import * as S from "./styles";

export const Badge = ({
  size = "small",
  children = "Testing",
  withIcon = false,
  background = "primary",
}: T.Props) => {
  return (
    <S.Wrapper size={size} background={background}>
      {withIcon && <S.Round />}
      <p>{children}</p>
    </S.Wrapper>
  );
};
