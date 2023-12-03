import { forwardRef, Ref } from "react";

import * as S from "../styles";
import * as T from "../types";

import { normalizeValue } from "@/utils/normalize";

const Points = forwardRef(
  ({ ...props }: T.Props, ref: Ref<HTMLButtonElement | null>) => {
    return (
      <S.Points>
        <S.Wrapper
          xmlns="http://www.w3.org/2000/svg"
          width={normalizeValue(2.5)}
          height={normalizeValue(2.5)}
          viewBox="0 0 2 1"
          xmlSpace="preserve"
          {...props}
        >
          <path
            stroke="none"
            d="M0.18 0.679824C0.279411 0.679824 0.36 0.599235 0.36 0.499824C0.36 0.400413 0.279411 0.319824 0.18 0.319824C0.0805887 0.319824 0 0.400413 0 0.499824C0 0.599235 0.0805887 0.679824 0.18 0.679824Z"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </path>
          <path
            stroke="none"
            d="M0.780098 0.679824C0.879509 0.679824 0.960098 0.599235 0.960098 0.499824C0.960098 0.400413 0.879509 0.319824 0.780098 0.319824C0.680686 0.319824 0.600098 0.400413 0.600098 0.499824C0.600098 0.599235 0.680686 0.679824 0.780098 0.679824Z"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </path>
          <path
            stroke="none"
            d="M1.3802 0.679824C1.47961 0.679824 1.5602 0.599235 1.5602 0.499824C1.5602 0.400413 1.47961 0.319824 1.3802 0.319824C1.28078 0.319824 1.2002 0.400413 1.2002 0.499824C1.2002 0.599235 1.28078 0.679824 1.3802 0.679824Z"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </path>
        </S.Wrapper>
      </S.Points>
    );
  }
);

Points.displayName = "Points";
export { Points };
