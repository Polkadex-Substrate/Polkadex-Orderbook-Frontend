import * as React from "react";
import * as S from "./styles";
import { Props } from "./types";

export const CustomTag = ({ isPositive, title }: Props) => (
  <S.Wrapper isPositive={!!isPositive}>{title}</S.Wrapper>
);
