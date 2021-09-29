import styled, { css, DefaultTheme } from "styled-components";

import IButton from "./types";

import { WrapperIcon, WrapperToken } from "src/ui/components/Icon/styles";

const wrapperModifier = {
  Small: () => css`
    font-size: 1.1rem;
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem;
  `,
  Medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.xsmall};
    padding: ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius.small};
    padding: ${theme.spacings.xxsmall};
  `,
  Large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
    border-radius: ${theme.border.radius.large};
    padding: ${theme.spacings.xxsmall};
  `,
};

export const Wrapper = styled.button<Partial<IButton>>`
  ${({ theme, size, isActive, background }) => css`
    display: flex;
    align-items: center;
    border: 0;
    background-color: ${isActive ? theme.colors.primary : theme.colors[background]};
    cursor: pointer;
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
