import styled, { css } from "styled-components";

import { LogoProps } from "./index";

import { normalizeValue } from "@/utils/normalize";

const imageModifier = {
  Small: () => css`
    min-width: ${normalizeValue(8)};
  `,
  Medium: () => css`
    width: ${normalizeValue(12)};
  `,
  Large: () => css`
    width: ${normalizeValue(16)};
  `,
};
export const Link = styled.div<Partial<LogoProps>>`
  ${({ size = "Medium" }) => css`
    display: block;
    cursor: pointer;
    ${imageModifier[size]}
  `}
`;

export const Image = styled.img``;

export const Svg = styled.svg`
  overflow: hidden;
`;

export const LogoText = styled.g`
  transition-duration: 3s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.1s;
  transition-property: initial;
  display: none;
  opacity: 0;
`;
export const LogoIcon = styled.g``;
export const OrderbookLogoWrapper = styled.svg<{ light: boolean }>`
  ${({ theme, light }) => css`
    fill: ${light ? theme.colors.white : theme.colors.text};
  `}
`;