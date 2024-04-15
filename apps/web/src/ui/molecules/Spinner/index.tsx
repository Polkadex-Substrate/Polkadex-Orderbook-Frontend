import { PropsWithChildren } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Spinner = ({
  color = "text",
  size = normalizeValue(1),
  ...props
}: Props) => (
  <S.Wrapper {...props}>
    <S.Container color={color} size={size} aria-hidden="true"></S.Container>
  </S.Wrapper>
);

export const LoadingSpinner = ({
  color = "text",
  size = normalizeValue(1.4),
  loading = true,
  children,
  ...props
}: PropsWithChildren<Props>) => (
  <>
    {loading ? (
      <S.SecondaryWrapper color={color} size={size} {...props}>
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          enableBackground={`new 0 0 50 50`}
          xmlSpace="preserve"
        >
          <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </S.SecondaryWrapper>
    ) : (
      children
    )}
  </>
);