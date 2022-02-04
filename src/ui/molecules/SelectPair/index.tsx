import React from "react";
import * as cryptoIcons from "@styled-icons/crypto";

import * as S from "./styles";

import { randomIcons } from "@polkadex/orderbook-ui/organisms/Funds/randomIcons";
import { toCapitalize } from "@polkadex/web-helpers";
import { Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";

export const SelectPairHeader = ({ title = "", icon = "Default" }) => {
  const { symbol } = randomIcons[Math.floor(Math.random() * randomIcons.length)];
  const IconComponent = cryptoIcons[toCapitalize(symbol)];
  return (
    <S.Wrapper>
      {title ? (
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
