import { useState } from "react";

import * as S from "./styles";
import Props from "./types";

export const Checkbox = ({
  label,
  labelFor = "",
  value,
  isChecked = false,
  onChange,
  ...props
}: Props) => {
  const [state, setState] = useState(false);

  return (
    <S.Wrapper>
      <input
        id={labelFor}
        type="checkbox"
        checked={state}
        value={value}
        onChange={() => setState(!state)}
        {...props}
      />
      {!!label && <label htmlFor={labelFor}>{label}</label>}
    </S.Wrapper>
  );
};
