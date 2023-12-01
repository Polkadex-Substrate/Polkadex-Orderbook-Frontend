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
    padding: ${isToken ? "0.1rem" : "0.2rem"};
  `,
  medium: (isToken: boolean) => css`
    width: ${normalizeValue(1.8)};
    height: ${normalizeValue(1.8)};
    padding: ${isToken ? "0.2rem" : "0.3rem"};
  `,
  extraMedium: (isToken: boolean) => css`
    width: ${normalizeValue(2.3)};
    height: ${normalizeValue(2.3)};
    padding: ${isToken ? "0.3rem" : normalizeValue(0.5)};
  `,
  large: (isToken: boolean) => css`
    width: ${normalizeValue(2.8)};
    height: ${normalizeValue(2.8)};
    padding: ${isToken ? "0.3em" : normalizeValue(0.5)};
  `,
  extraLarge: (isToken: boolean) => css`
    width: 3.5rem;
    height: 3.5rem;
    padding: ${isToken ? "0.4rem" : "0.6rem"};
  `,
  giant: (isToken: boolean) => css`
    width: 4rem;
    height: 4rem;
    padding: ${isToken ? "0.8rem" : "0.6rem"};
  `,
  extraGiant: (isToken: boolean) => css`
    width: ${normalizeValue(5)};
    height: ${normalizeValue(5)};
    padding: ${isToken ? normalizeValue(1) : "0.6rem"};
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
