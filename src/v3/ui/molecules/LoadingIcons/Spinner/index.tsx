import { forwardRef, Ref } from "react";

import * as S from "../styles";
import * as T from "../types";

const Spinner = forwardRef(({ ...props }: T.Props, ref: Ref<HTMLButtonElement | null>) => {
  return (
    <S.Wrapper
      xmlns="http://www.w3.org/2000/svg"
      width="3rem"
      height="3rem"
      viewBox="0 0 100 100"
      {...props}>
      <rect x="0" y="0" width="100" height="100" stroke="none" fill="none"></rect>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#fff"
        strokeOpacity="0.2"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round">
        <animate
          id="animation1"
          attributeName="opacity"
          from="0.5"
          to="1"
          dur="1s"
          begin="0s;animation2.end"
        />
        <animate
          id="animation2"
          attributeName="opacity"
          from="1"
          to="0.5"
          dur="1s"
          begin="animation1.end"
        />
      </circle>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#fff"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round">
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          repeatCount="indefinite"
          from="0"
          to="502"></animate>
        <animate
          attributeName="stroke-dasharray"
          dur="1.5"
          repeatCount="indefinite"
          values="150.6 100.4;1 250;150.6 100.4"></animate>
      </circle>
    </S.Wrapper>
  );
});

Spinner.displayName = "Spinner";
export { Spinner };
