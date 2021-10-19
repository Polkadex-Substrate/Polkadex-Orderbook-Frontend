import styled, { css } from "styled-components";

import Props from "./types";

const imageModifier = {
  Small: () => css`
    width: 8rem;
  `,
  Medium: () => css`
    width: 12rem;
  `,
  Large: () => css`
    width: 14rem;
  `,
};

export const LogoText = styled.g`
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.1s;
  transition-property: initial;
  opacity: 1;
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

export const Link = styled.a<Partial<Props>>`
  ${({ size, theme }) => css`
    & svg {
      ${!!size && imageModifier[size]}
    }
    @media screen and (max-width: 1080px) {
     max-width: 2.4rem;
    }
    }
  `}
`;

export const LogoIcon = styled.g``;
