import * as S from "./styles";
import { Props } from "./types";

export const Tag = ({ isPositive, title }: Props) => (
  <S.Wrapper isPositive={!!isPositive}>{title}</S.Wrapper>
);
