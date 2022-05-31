import styled, { css } from "styled-components";
const sizeModifier = {
  small: () => css`
    max-width: 8rem;
  `,
  medium: () => css`
    max-width: 12rem;
  `,
  large: () => css`
    max-width: 14rem;
  `,
};

export const Wrapper = styled.a<{ size?: string }>`
  ${({ size }) => css`
    cursor: pointer;
    svg {
      pointer-events: none;
    }
    ${sizeModifier[size]()}
  `}
`;

export const Text = styled.g`
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.1s;
  transition-property: initial;
  opacity: 1;
`;

export const Icon = styled.g``;
