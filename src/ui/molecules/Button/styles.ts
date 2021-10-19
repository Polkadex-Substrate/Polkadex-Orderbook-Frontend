import styled, { css, DefaultTheme } from "styled-components";

import IButton from "./types";

import { WrapperIcon, WrapperToken } from "src/ui/atoms/Icon/styles";

const wrapperModifier = {
  xSmall: () => css`
    font-size: 1.1rem;
    border-radius: 0.2rem;
    padding: 0.3rem;
  `,
  small: () => css`
    font-size: 1.2rem;
    border-radius: 0.5rem;
    padding: 0.7rem;
  `,
  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    border-radius: ${theme.border.radius.small};
    padding: 1.4rem 1rem;
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
    border-radius: ${theme.border.radius.large};
    padding: ${theme.spacings.xxsmall};
  `,
};

export const Wrapper = styled.button<Partial<IButton>>`
  ${({ theme, size, isActive, background, isFull }) => css`
    display: flex;
    align-items: center;
    border: 0;
    background-color: ${isActive ? theme.colors.primary : theme.colors[background]};
    cursor: pointer;
    ${isFull &&
    css`
      width: 100%;
      justify-content: center;
    `}
    ${wrapperModifier[size](theme)}

    & :active {
      background-color: ${theme.colors.primary};
      transform: translateY(0.2rem);
    }
    & ${WrapperIcon}, ${WrapperToken} {
      margin-right: 0.5rem;
    }

    & :disabled {
      opacity: 0.5;
    }
  `}
`;
