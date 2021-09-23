import styled, { css, DefaultTheme } from "styled-components";

import Props from "./types";

const WrapperModifier = {
  XSmall: (theme: DefaultTheme) => css`
    height: 1.9rem;
    width: 1.9rem;
    padding: ${theme.spacings.xxxsmall};
    border-radius: 0.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  `,
  Small: (theme: DefaultTheme) => css`
    height: 2.5rem;
    width: 2.5rem;
    padding: ${theme.spacings.xxxsmall};
    border-radius: 0.7rem;
  `,
  Medium: (theme: DefaultTheme) => css`
    height: 3.1rem;
    width: 3.1rem;
    padding: 0.8rem;
    border-radius: ${theme.border.radius.medium};
  `,
  Large: (theme: DefaultTheme) => css`
    height: 5rem;
    width: 5rem;
    padding: 1.2rem;
    border-radius: ${theme.border.radius.large};
  `,
  DarkGray: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondaryBackground};
    color: ${theme.colors.white};
  `,
  LightGray: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondaryBackground};
    color: ${theme.colors.black};
  `,
  None: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.black};
  `,
  Primary: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  Gray: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondaryBackground};
    color: ${theme.colors.white};
  `,
};

export const Wrapper = styled.div<Partial<Props>>`
  ${({ theme, background, size }) => css`
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    & div {
      display: flex;
      align-items: center;
      justify-content: center;

      ${background && WrapperModifier[background](theme)};
      ${size && WrapperModifier[size](theme)};

      & img {
        width: 100%;
      }
    }

    & span {
      display: block;
      margin-left: 1rem;
      color: ${theme.colors.white};
    }
  `}
`;
