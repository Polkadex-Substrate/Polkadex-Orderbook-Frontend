import React from "react";

import * as S from "./styles";

import { Spinner } from "src/ui/components";

export const LoadingSpinner = () => {
  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  );
};
