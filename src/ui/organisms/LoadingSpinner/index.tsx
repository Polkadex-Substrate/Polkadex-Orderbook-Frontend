import React from "react";

import * as S from "./styles";

import { Spinner } from "@polkadex/orderbook-ui/molecules";

export const LoadingSpinner = () => {
  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  );
};
