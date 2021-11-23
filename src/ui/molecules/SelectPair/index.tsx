import React from "react";

import * as S from "./styles";

import { Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";

export const SelectPairHeader = ({ title = "", icon = "Default" }) => {
  return (
    <S.Wrapper>
      {title ? (
        <>
          <Icon isToken name={icon} size="large" background="secondaryBackground" />
          <span>{title}</span>
          <Icon name="ArrowBottom" size="small" />
        </>
      ) : (
        <>
          <Skeleton width="3rem" height="3rem" />
          <Skeleton width="6rem" style={{ marginLeft: "0.5rem" }} />
        </>
      )}
    </S.Wrapper>
  );
};
