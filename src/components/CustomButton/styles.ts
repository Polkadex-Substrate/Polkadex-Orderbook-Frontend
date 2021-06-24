import { WrapperIcon, WrapperToken } from "src/components/CustomIcon/styles";
import styled, { css, DefaultTheme } from "styled-components";

import IButton from "./types";

const wrapperModifier = {
  Small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
    border-radius: ${theme.border.radius.small};
  `,
  Medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall};
    border-radius: ${theme.border.radius.medium};
  `,
  Large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
    border-radius: ${theme.border.radius.large};
  `,
};

export const Wrapper = styled.button<Partial<IButton>>`
  ${({ theme, size, isActive, background }) => css`
    display: flex;
    align-items: center;
    border: 0;
    padding: ${theme.spacings.xxsmall};
    text-transform: capitalize;
    background-color: ${isActive
      ? theme.colors.primary
      : theme.colors[background]};
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    cursor: pointer;
    ${wrapperModifier[size](theme)}

    :active {
      background-color: ${theme.colors.primary};
      transform: translateY(0.4rem);
    }
    ${WrapperIcon}, ${WrapperToken} {
      margin-right: 0.5rem;
    }

    :disabled {
      opacity: 0.5;
    }
  `}
`;
