import styled, { css } from "styled-components";

import { Props } from "./types";

const modifier = {
  xsmall: () => css`
    width: 2rem;
    height: 2rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
  `,
  small: () => css`
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 0.8rem;
  `,
  normal: () => css`
    width: 3rem;
    height: 3rem;
    padding: 0.6rem;
    border-radius: 1rem;
  `,
  medium: () => css`
    width: 3.5rem;
    height: 3.5rem;
    padding: 0.5rem;
    border-radius: 1.2rem;
  `,
  large: () => css`
    width: 4rem;
    height: 4rem;
    padding: 0.8rem;
    border-radius: 1.6rem;
  `,
  xlarge: () => css`
    width: 4.5rem;
    height: 4.5rem;
    padding: 0.9rem;
    border-radius: 1.8rem;
  `,
};

export const Wrapper = styled.div<Partial<Props>>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const WrapperIcon = styled(Wrapper)<Partial<Props>>`
  ${({ theme, isActive, background, size, hoverable }) => css`
    background: ${isActive ? theme.colors.primary : theme.colors[background]};
    ${modifier[size]};
    ${hoverable &&
    css`
      :hover {
        background: ${isActive
          ? theme.colors.primary
          : background === "none"
          ? "none"
          : theme.colors.secondaryBackground};
      }
    `}

    svg {
      fill: ${isActive ? theme.colors.white : theme.colors.text};
    }
  `}
`;
export const WrapperToken = styled(Wrapper)`
  ${({ theme, background, size }) => css`
    background: ${theme.colors[background]};
    ${modifier[size]};
    img {
      width:100%;
      height: 100%;
    }
  `}
`;
