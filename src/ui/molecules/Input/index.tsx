import { Field } from "formik";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useMemo,
} from "react";

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

type PasscodeProps = {
  numInputs: number;
  onChange: (v: string | number) => void;
  isDisabled?: boolean;
  error?: string;
  value?: string;
  shouldAutoFocus?: boolean;
  name: string;
  label: string;
};

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

export const PassCode = ({
  numInputs,
  onChange,
  isDisabled,
  value,
  error,
  shouldAutoFocus,
  label,
  name,
}: PasscodeProps) => {
  const [state, setState] = useState(0);

  const currentValue = useMemo(() => value?.toString().split(""), [value]);

  // Helper to return value from input
  const handleChange = (e: string[]) => {
    const inputValue = e.join("");
    onChange(inputValue.length ? Number(inputValue) : "");
  };

  // Focus on input by index
  const focusInput = (input: number) => {
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);
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

  // Change value at focused input
  const changeCodeAtFocus = (inputValue: string) => {
    const currentVal = currentValue;
    currentVal[state] = inputValue[0];
    handleChange(currentVal);
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
      const otp = currentValue;

      // Get pastedData in an array of max size (num of inputs - current position)
      const pastedData = e.target.value.slice(0, numInputs - state).split("");
      // Paste data from focused input onwards
      for (let pos = 0; pos < numInputs; ++pos) {
        if (pos >= state && pastedData.length > 0) {
          otp[pos] = pastedData.shift();
        }
      }
      handleChange(otp);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  const handleOnKeyDown = (e) => {
    if (e.keyCode === BACKSPACE || e.key === "Backspace") {
      e.preventDefault();
      changeCodeAtFocus("");
      focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === "Delete") {
      e.preventDefault();
      changeCodeAtFocus("");
    } else if (e.keyCode === LEFT_ARROW || e.key === "ArrowLeft") {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === "ArrowRight") {
      e.preventDefault();
      focusNextInput();
    }
  };
  return (
    <S.PassCodeWrapper>
      <label htmlFor={name}>
        {label && <span>{label}</span>}
        <S.PassCode>
          {[...Array(numInputs)].map((_, i) => (
            <S.LinePassCode key={i} error={!!error?.length}>
              <TextInput
                onChange={handleOnChange}
                onFocus={(e) => {
                  setState(i);
                  e.target.select();
                }}
                onInput={handleOnInput}
                focus={state === i}
                onKeyDown={handleOnKeyDown}
                value={value ? value.toString().charAt(i) : ""}
                disabled={isDisabled}
                placeholder="0"
                shouldAutoFocus={shouldAutoFocus}
              />
            </S.LinePassCode>
          ))}
        </S.PassCode>
      </label>
      {!!error?.length && (
        <S.Error style={{ display: "block", marginTop: 10 }} hasMargin={false}>
          {error}
        </S.Error>
      )}
    </S.PassCodeWrapper>
  );
};

type TextInputProps = {
  shouldAutoFocus?: boolean;
  focus?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ focus, shouldAutoFocus, ...props }: TextInputProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (focus) ref.current.focus();
  }, [focus]);

  return (
    <input
      type="number"
      maxLength={1}
      min={0}
      max={9}
      inputMode="numeric"
      ref={ref}
      {...props}
    />
  );
};
