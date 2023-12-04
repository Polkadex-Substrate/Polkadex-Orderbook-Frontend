import styled, { css } from "styled-components";

import { Props } from "./types";

import { normalizeValue } from "@/utils/normalize";

const sizeModifier = {
  small: () => css`
    width: ${normalizeValue(0.8)};
    height: ${normalizeValue(0.8)};
  `,
  extraSmall: (isToken: boolean) => css`
    width: ${normalizeValue(1.3)};
    height: ${normalizeValue(1.3)};
    padding: ${isToken ? normalizeValue(0.1) : normalizeValue(0.2)};
  `,
  medium: (isToken: boolean) => css`
    width: ${normalizeValue(1.8)};
    height: ${normalizeValue(1.8)};
    padding: ${isToken ? normalizeValue(0.2) : normalizeValue(0.3)};
  `,
  extraMedium: (isToken: boolean) => css`
    width: ${normalizeValue(2.3)};
    height: ${normalizeValue(2.3)};
    padding: ${isToken ? normalizeValue(0.3) : normalizeValue(0.5)};
  `,
  large: (isToken: boolean) => css`
    width: ${normalizeValue(2.8)};
    height: ${normalizeValue(2.8)};
    padding: ${isToken ? normalizeValue(3) : normalizeValue(0.5)};
  `,
  extraLarge: (isToken: boolean) => css`
    width: ${normalizeValue(3.5)};
    height: ${normalizeValue(3.5)};
    padding: ${isToken ? normalizeValue(0.4) : normalizeValue(0.6)};
  `,
  giant: (isToken: boolean) => css`
    width: ${normalizeValue(4)};
    height: ${normalizeValue(4)};
    padding: ${isToken ? normalizeValue(0.6) : normalizeValue(0.6)};
  `,
  extraGiant: (isToken: boolean) => css`
    width: ${normalizeValue(5)};
    height: ${normalizeValue(5)};
    padding: ${isToken ? normalizeValue(1) : normalizeValue(0.6)};
  `,
};

export const Wrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Container = styled.div<Partial<Props>>`
  ${({
    theme,
    background = "",
    color = "white",
    stroke = "none",
    size = "small",
    isActive = false,
    isToken = false,
    fill,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isActive ? theme.colors.primary : theme.colors[background]};
    border-radius: 20%;
    svg {
      width: 100%;
      height: 100%;
      fill: ${fill
        ? theme.colors[fill]
        : isActive
        ? theme.colors.white
        : theme.colors[color]};
      stroke: ${theme.colors[stroke]};
    }
    ${sizeModifier[size](isToken)};
    ${!background &&
    css`
      padding: 0;
    `}
  `}
`;
