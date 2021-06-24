import React from 'react'
import * as S from "./styles"
import {
  CustomButton,
  CustomDropdown,
  CustomIcon,
  CustomIconToken,
  CustomSkeleton,
  CustomTokenSearch,
} from "src/components";
import { InformationItemProps, layoutProps, PairProps } from "./types";

export const CustomPairSelect = ({baseUnit, quoteUnit}) => {
  return (
    <S.PairWrapper>
      <S.PairWrapperCoin>
        <PairHeader token={baseUnit} />
      </S.PairWrapperCoin>
      <S.PairWrapperExchange>
        <CustomIcon icon="Exchange" background="none" />
      </S.PairWrapperExchange>
      <S.PairWrapperCoin>
        <CustomDropdown
          title={<PairHeader token={quoteUnit} pair />}
          direction="bottom"
          isOpacity
        >
          <CustomTokenSearch label="Available Pairs" />
        </CustomDropdown>
      </S.PairWrapperCoin>
    </S.PairWrapper>
  )
}

const PairHeader = ({ pair = false, token }: PairProps) => {
  return (
    <S.HeaderWrapper>
      <S.HeaderLabel>{pair ? "Pair" : "Token"}</S.HeaderLabel>
      <S.HeaderContainer>
        {token ? (
          <>
            <CustomIconToken size="large" icon={token} />
            <span>{token}</span>
          </>
        ) : (
          <CustomSkeleton width="5rem" />
        )}
        {pair && <CustomIcon icon="ArrowBottom" size="xsmall" />}
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};