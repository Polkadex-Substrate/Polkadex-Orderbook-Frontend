import styled, { css } from "styled-components";

import { Props } from "./types";

const modifier = {
  xxsmall: () => css`
    max-width: 1.5rem;
    max-height: 1.5rem;
    padding: 0.2rem;
    border-radius: 0.3rem;
  `,
  xsmall: () => css`
    max-width: 2rem;
    max-height: 2rem;
    padding: 0.4rem;
    border-radius: 0.4rem;
  `,
  small: () => css`
    max-width: 2.5rem;
    max-height: 2.5rem;
    padding: 0.2rem;
    border-radius: 0.6rem;
  `,
  normal: () => css`
    max-width: 3rem;
    max-height: 3rem;
    padding: 0.6rem;
    border-radius: 0.8rem;
  `,
  medium: () => css`
    max-width: 3.5rem;
    max-height: 3.5rem;
    padding: 0.5rem;
    border-radius: 1rem;
  `,
  large: () => css`
    max-width: 4rem;
    max-height: 4rem;
    padding: 0.1rem;
    border-radius: 1.2rem;
  `,
  xlarge: () => css`
    max-width: 4.5rem;
    max-height: 4.5rem;
    padding: 0.9rem;
    border-radius: 1.4rem;
  `,
};

export const Wrapper = styled.div<Partial<Props>>`
  ${({ size }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${modifier[size]};
  `}
`;

export const WrapperIcon = styled(Wrapper)<Partial<Props>>`
  ${({ theme, isActive, background, size, hoverable }) => css`
    background: ${isActive ? theme.colors.primary : theme.colors[background]};
    ${modifier[size]};
    ${hoverable &&
    css`
      & :hover {
        background: ${isActive
          ? theme.colors.primary
          : background === "none"
          ? "none"
          : theme.colors.secondaryBackground};
      }
    `}

    & svg {
      fill: ${isActive ? theme.colors.white : theme.colors.text};
    }
  `}
`;
export const WrapperToken = styled(Wrapper)`
  ${({ theme, background }) => css`
    background: ${theme.colors[background]};
    & svg {
      fill: ${theme.colors.text};
    }
  `}
`;
