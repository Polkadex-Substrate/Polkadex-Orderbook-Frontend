import React from "react";

import * as S from "./styles";
import { InformationProps } from "./types";

import { Skeleton } from "src/ui/components";

export const Information = ({
  orientation = "vertical",
  label = "Label",
  text,
  color = "white",
}: InformationProps) => (
  <S.Wrapper orientation={orientation} color={color}>
    <span> {label} </span>
    <span>{text || <Skeleton width="5rem" />}</span>
  </S.Wrapper>
);
