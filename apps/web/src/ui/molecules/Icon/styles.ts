import styled, { css } from "styled-components";

import { Props } from "./types";

const sizeModifier = {
  small: () => css`
    width: 0.8rem;
    height: 0.8rem;
  `,
  extraSmall: (isToken: boolean) => css`
    width: 1.3rem;
    height: 1.3rem;
    padding: ${isToken ? "0.1rem" : "0.2rem"};
  `,
  medium: (isToken: boolean) => css`
    width: 1.8rem;
    height: 1.8rem;
    padding: ${isToken ? "0.2rem" : "0.3rem"};
  `,
  extraMedium: (isToken: boolean) => css`
    width: 2.3rem;
    height: 2.3rem;
    padding: ${isToken ? "0.3rem" : "0.5rem"};
  `,
  large: (isToken: boolean) => css`
    width: 2.8rem;
    height: 2.8rem;
    padding: ${isToken ? "0.3em" : "0.5rem"};
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
    width: 5rem;
    height: 5rem;
    padding: ${isToken ? "1rem" : "0.6rem"};
  `,
};

export const Wrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Container = styled.div<Partial<Props>>`
  ${({
    theme,
    background = "none",
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
