import { Field } from "formik";

import * as S from "./styles";
import { Props } from "./types";

export const Input = ({ label, error, ...props }: Props) => (
  <S.Wrapper>
    <label htmlFor={props.name}>
      {label || ""}
      <Field {...props} />
    </label>
    {error && <span>{error}</span>}
  </S.Wrapper>
);

export const InputPrimary = ({ label, error, ...props }: Props) => (
  <S.Primary>
    <label htmlFor={props.name}>
      {label || ""}
      <Field {...props} />
    </label>
    {error && <span>{error}</span>}
  </S.Primary>
);
