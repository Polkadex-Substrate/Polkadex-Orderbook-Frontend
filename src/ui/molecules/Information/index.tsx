import React from "react";

import * as S from "./styles";
import { InformationProps } from "./types";

import { Skeleton } from "@polkadex/orderbook-ui/molecules";

export const Information = ({
  orientation = "vertical",
  label = "Label",
  text,
  color = "white",
}: InformationProps) => (
  <S.Wrapper orientation={orientation} color={color}>
    <span> {label} </span>
    {text ? (
      <span>{text}</span>
    ) : (
      <Skeleton
        width="5rem"
        style={{ display: orientation === "horizontal" ? "inline-block" : "block" }}
      />
    )}
  </S.Wrapper>
);
