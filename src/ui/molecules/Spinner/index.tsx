import * as S from "./styles";
import { Props } from "./types";

export const Spinner = ({ color = "text", size = "1rem" }: Props) => (
  <S.Wrapper>
    <S.Container color={color} size={size} aria-hidden="true"></S.Container>
  </S.Wrapper>
);
