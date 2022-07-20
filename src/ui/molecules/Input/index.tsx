import { Field } from "formik";
import { forwardRef, Ref, useRef } from "react";

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
