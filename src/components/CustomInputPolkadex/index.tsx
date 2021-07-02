import React, { ChangeEvent, useState } from "react";
import { CustomButton, CustomIcon } from "src/components";
import { CustomTokenSelect } from "src/containers";
import { useReduxSelector } from "src/hooks";
import { selectUserLoggedIn } from "src/modules";

import * as S from "./styles";
import { OrderInputProps, Props, AmountInputProps } from "./types";

export const CustomInputPolkadex = ({
  error,
  value = "",
  disabled = false,
  label,
  name,
  icon,
  background = "none",
  WrapperStyle,
  children,
  ...props
}: Props) => {
  return (
    <S.Wrapper background={background} {...WrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <S.Container>
        {!!icon && <CustomIcon {...icon} />}
        <input
          value={value}
          name={name}
          {...props}
        />
      </S.Container>
      {!!error && <p>{error}</p>}
    </S.Wrapper>
  );
};

export const CustomOrderInputPolkadex = ({ 
  isBuy = false, 
  background, 
  value, 
  amount, 
  name, 
  label, 
  token, 
  children, 
  reset, 
  disabled, 
  ...props }: OrderInputProps) =>{ 
  return(
  <S.Main >
     <label htmlFor={name}>{label}</label>
     <S.Box background={background}>
       <S.Header>
        <CustomTokenSelect balance={amount} ticket={token} tokenName={token}/>
       </S.Header>
        <S.Content>
          <S.Card>
            <input
              value={value}
              name={name}
              {...props}
            />
            <S.Actions>
              {reset && <button type="button" onClick={reset}>Reset</button>}
              <span>{token}</span>
            </S.Actions>
          </S.Card>
          <S.Card>
            <span>~0</span>
            <span>USD</span>
          </S.Card>
          {children && (
            <S.Card>
              <S.OrderInputFooter>
                {children}
              </S.OrderInputFooter>
            </S.Card>
          )}
        </S.Content>
     </S.Box>
  </S.Main>
);
}

export const CustomAmountInputPolkadex = ({from, to, name, label, action, ...props}: AmountInputProps) =>{ 
  return(
    <S.AmountWrapper>
      <S.AmountBox>
        <label htmlFor={name}>{label} ({from})</label>
        <S.AmountContainer>
          <input {...props} />
        </S.AmountContainer>
      </S.AmountBox>
      <button type="button" onClick={()=> action()}>
        <CustomIcon icon="Swap" background="primaryBackground" size="large" />
      </button>
  </S.AmountWrapper>
);
}


export const CustomSliderRangePolkadex = () => (
  <S.WrapperSlider>
    <input
      type="range"
      min="3"
      max="6"
      step="1"
      value="6"
      onChange={(e) => console.log(e.target.value)}
    />
  </S.WrapperSlider>
);
export const CustomInputWalletPolkadex = ({
  error,
  value = "",
  label,
  name,
  icon = {
    icon: "Copy",
    background: "none",
  },
  background = "secondaryBackground",
  WrapperStyle,
  ...props
}: Props) => {
  return (
    <S.Wrapper background={background}>
      <S.WalletInputContainer>
        <input
          value={value}
          name={name}
          {...props}
        />
        {!!icon && <CustomIcon {...icon} />}
      </S.WalletInputContainer>
      {!!error && <p>{error}</p>}
    </S.Wrapper>
  );
};
