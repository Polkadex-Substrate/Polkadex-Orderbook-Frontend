import React, { ChangeEvent, useState } from "react";
import { CustomButton, CustomIcon } from "src/components";
import { useReduxSelector } from "src/hooks";
import { selectUserLoggedIn } from "src/modules";

import * as S from "./styles";
import { OrderInputProps, Props } from "./types";

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

export const CustomOrderInputPolkadex = ({ isBuy = false, background, value, amount, name, label, token, children, disabled, ...props }: OrderInputProps) =>{ 
  const userLoggedIn = useReduxSelector(selectUserLoggedIn)
  return(
  <S.Wrapper background={background}>
    <S.OrderInputHeader>
      {userLoggedIn && amount && (
      <p>
        <strong>{amount}</strong> {token} Available
      </p>)
      }
      
    </S.OrderInputHeader>
    <S.OrderInputContent>
      <label htmlFor={name}>{label}</label>
      <S.OrderInputContentData>
        <S.OrderInputContentActions>
        <input
          value={value}
          name={name}
          {...props}
        />
          <span>~ 0</span>
        </S.OrderInputContentActions>
        <S.OrderInputContentActions>
          {/* {isBuy && (
            <div>
              <CustomButton title="Max" size="Small" />
            </div>
          )} */}
          <S.OrderInputContentBox>
            <span>{token}</span>
            <button type="button" onClick={() => console.log("Change..")}>
              USD
            </button>
          </S.OrderInputContentBox>
        </S.OrderInputContentActions>
      </S.OrderInputContentData>
    </S.OrderInputContent>
    {children && (
      <S.OrderInputFooter>
        {children}
      </S.OrderInputFooter>
    )}
  </S.Wrapper>
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
