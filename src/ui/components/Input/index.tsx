import { ChangeEvent, useState } from "react";

import * as S from "./styles";
import { OrderInputProps, Props } from "./types";

import { Button, Icon } from "src/ui";

export const Input = ({
  error,
  onInputChange,
  initialValue = "",
  disabled = false,
  label,
  name,
  icon,
  background = "none",
  WrapperStyle,
  ...props
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    !!onInputChange && onInputChange(newValue);
  };
  return (
    <S.Wrapper background={background} {...WrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <S.Container>
        {!!icon && <Icon {...icon} />}
        <input onChange={onChange} value={value} disabled={disabled} name={name} {...props} />
      </S.Container>
      {!!error && <p>{error}</p>}
    </S.Wrapper>
  );
};

export const OrderInput = ({ isBuy = false, background }: OrderInputProps) => (
  <S.Wrapper background={background}>
    <S.OrderInputHeader>
      <p>
        <strong>0</strong> DOT Available
      </p>
    </S.OrderInputHeader>
    <S.OrderInputContent>
      <label htmlFor="buy">I will buy</label>
      <S.OrderInputContentData>
        <S.OrderInputContentActions>
          <input
            type="text"
            placeholder="0.000"
            onChange={(e) => console.log(e.target.value)}
          />
          <span>~92.00</span>
        </S.OrderInputContentActions>
        <S.OrderInputContentActions>
          {isBuy && (
            <div>
              <Button title="Max" size="small" />
            </div>
          )}
          <div>
            <span>DOT</span>
            <button type="button" onClick={() => console.log("Change..")}>
              USD
            </button>
          </div>
        </S.OrderInputContentActions>
      </S.OrderInputContentData>
    </S.OrderInputContent>
    {isBuy && (
      <S.OrderInputFooter>
        <SliderRange />
      </S.OrderInputFooter>
    )}
  </S.Wrapper>
);

export const SliderRange = () => (
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
export const InputWallet = ({
  error,
  onInputChange,
  initialValue = "",
  disabled = false,
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
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    !!onInputChange && onInputChange(newValue);
  };
  return (
    <S.Wrapper background={background}>
      <S.WalletInputContainer>
        <input onChange={onChange} value={value} disabled={disabled} name={name} {...props} />
        {!!icon && <Icon {...icon} />}
      </S.WalletInputContainer>
      {!!error && <p>{error}</p>}
    </S.Wrapper>
  );
};
