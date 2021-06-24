import React from 'react'
import { Spinner } from 'src/components';
import * as S from "./styles"

export const CustomLoading = () => {
  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  )
}

