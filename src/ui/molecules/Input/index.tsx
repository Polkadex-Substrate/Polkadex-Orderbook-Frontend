import { Field } from "formik";

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
    <label htmlFor={props.name}>
      {label || ""}
      <Field {...props} />
    </label>
    {error && <span>{error}</span>}
  </S.Primary>
);

export const SecondaryInput = ({ label = "", children, ...props }: T.SecondaryInputProps) => {
  return (
    <S.SecondaryWrapper>
      <label htmlFor={props.name}>{label}</label>
      <div>
        <input type="text" {...props} />
        {children || (
          <Skeleton height="10px" style={{ display: "inline-block", width: "2rem" }} />
        )}
      </div>
    </S.SecondaryWrapper>
  );
};
