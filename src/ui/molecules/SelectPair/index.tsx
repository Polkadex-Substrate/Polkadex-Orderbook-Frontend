import React from "react";
import * as cryptoIcons from "@styled-icons/crypto";

import * as S from "./styles";

import { Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";

export const SelectPairHeader = ({ title = "", icon }) => {
  const IconComponent = cryptoIcons[icon];
  return (
    <S.Wrapper>
      {title && icon ? (
        <>
          <S.TokenWrapper>
            <IconComponent />
          </S.TokenWrapper>
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
