import { Field } from "formik";
import { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";

import * as S from "./styles";
import * as T from "./types";

import { Skeleton } from "@polkadex/orderbook-ui/molecules";

export const Input = ({ label, error, ...props }: T.Props) => (
  <S.Wrapper>
    <label htmlFor={props.name}>
      {label || ""}
      <Field {...props} />
    </label>
    {error && <span>{error}</span>}
  </S.Wrapper>
);

export const InputPrimary = ({ label, error, ...props }: T.Props) => (
  <S.Primary>
    <S.Box>
      <label htmlFor={props.name}>
        {label || ""}
        <Field {...props} />
      </label>
    </S.Box>
    {error && <S.Error>{error}</S.Error>}
  </S.Primary>
);

export const SecondaryInput = ({ label, children, ...props }: T.SecondaryInputProps) => {
  return (
    <S.SecondaryWrapper hasLabel={!!label}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <div>
        <input type="text" {...props} />
        {children || (
          <Skeleton height="10px" style={{ display: "inline-block", width: "2rem" }} />
        )}
      </div>
    </S.SecondaryWrapper>
  );
};

export const InputLine = forwardRef(
  ({ label, error, children, ...props }: T.Props, ref: T.ReactRef<HTMLInputElement>) => {
    const inputRef = useRef(null);

    return (
      <div>
        <S.LineBox error={!!error?.length}>
          <label htmlFor={props.name}>
            {label && <span>{label}</span>}
            <S.LineContainer>
              <input ref={ref || inputRef} {...props} />
              {children}
            </S.LineContainer>
          </label>
        </S.LineBox>
        {error && <S.Error hasMargin={false}>{error}</S.Error>}
      </div>
    );
  }
);

InputLine.displayName = "InputLine";

export const PassCode = ({
  error,
  inputs,
  handleChange,
  maxLength = 1,
  ...props
}: T.Props & { handleChange: (otp: number | string) => void; inputs: number }) => {
  const [state, setState] = useState(0);

  const getOtpValue = () => (props.value ? props.value.toString().split("") : []);

  // Helper to return OTP from input
  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join("");
    handleChange(otpValue);
  };

  // Focus on input by index
  const focusInput = (input: number) => {
    const activeInput = Math.max(Math.min(inputs - 1, input), 0);
    setState(activeInput);
  };

  // Focus on next input
  const focusNextInput = () => {
    focusInput(state + 1);
  };

  // Focus on previous input
  const focusPrevInput = () => {
    focusInput(state - 1);
  };

  // Change OTP value at focused input
  const changeCodeAtFocus = (value: string) => {
    const otp = getOtpValue();
    otp[state] = value[0];
    handleOtpChange(otp);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value.length > 1) {
      e.preventDefault();
      return;
    }
    changeCodeAtFocus(e.target.value);
    focusNextInput();
  };
  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    if (e.target.value && e.target.value.length > 1) {
      e.preventDefault();
      const otp = getOtpValue();

      // Get pastedData in an array of max size (num of inputs - current position)
      const pastedData = e.target.value.slice(0, inputs - state).split("");
      // Paste data from focused input onwards
      for (let pos = 0; pos < inputs; ++pos) {
        if (pos >= state && pastedData.length > 0) {
          otp[pos] = pastedData.shift();
        }
      }
      handleOtpChange(otp);
    }
  };
  return (
    <div>
      <S.PassCode error={!!error?.length}>
        {[...Array(inputs)].map((_, i) => (
          <S.LinePassCode key={i}>
            <TextInput
              onFocus={(e) => {
                setState(i);
                e.target.select();
              }}
              onInput={handleOnInput}
              shouldAutoFocus={state === i}
              type="text"
              maxLength={maxLength}
              {...props}
            />
          </S.LinePassCode>
        ))}
      </S.PassCode>
      {error && <S.Error hasMargin={false}>{error}</S.Error>}
    </div>
  );
};

const TextInput = ({ shouldAutoFocus, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (shouldAutoFocus) {
      console.log("focus");
      ref.current.focus();
    }
  }, [shouldAutoFocus]);

  return <input ref={ref} {...props} />;
};
