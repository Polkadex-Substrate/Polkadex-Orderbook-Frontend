import { PropsWithChildren } from "react";
import { isValidChildren } from "@orderbook/core/utils";

import * as S from "./styles";
import * as T from "./types";

export const CheckboxCustom = ({
  children,
  name = `polkadexui${String(Math.random())}`,
  labelProps,
  ...props
}: PropsWithChildren<T.Props>) => {
  const hasChild =
    isValidChildren(children)?.length || children?.toString()?.length;

  return (
    <S.Wrapper disabled={props.disabled}>
      <input type="checkbox" id={name} {...props} />
      {hasChild && (
        <label {...labelProps} htmlFor={name}>
          {children}
        </label>
      )}
    </S.Wrapper>
  );
};
