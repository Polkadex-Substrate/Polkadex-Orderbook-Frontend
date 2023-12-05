import { forwardRef, Ref } from "react";

import * as S from "../styles";
import * as T from "../types";

import { normalizeValue } from "@/utils/normalize";
const Pulse = forwardRef(
  ({ ...props }: T.Props, ref: Ref<HTMLButtonElement | null>) => {
    return (
      <S.Wrapper
        xmlns="http://www.w3.org/2000/svg"
        width={normalizeValue(2.5)}
        height={normalizeValue(2.5)}
        viewBox="0 0 45 45"
        fill="none"
        capture-installed="true"
        {...props}
      >
        <g
          fill="none"
          fillRule="evenodd"
          transform="translate(1 1)"
          strokeWidth="2"
        >
          <circle cx="22" cy="22" r="14.6676" strokeOpacity="0">
            <animate
              attributeName="r"
              begin="1.5s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="1.5s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="1.5s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="6.66755" strokeOpacity="0">
            <animate
              attributeName="r"
              begin="3s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="3s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="3s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="3.49668">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </S.Wrapper>
    );
  }
);

Pulse.displayName = "Pulse";
export { Pulse };
