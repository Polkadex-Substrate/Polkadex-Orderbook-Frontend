import React from "react";
import { Spinner } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const LoadingSpinner = () => {
  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  );
};
