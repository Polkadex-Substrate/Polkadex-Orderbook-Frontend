import styled, { css } from "styled-components";

import { Props } from "./types";

const modifier = {
  xxSmall: () => css`
    max-width: 40rem;
  `,
  xSmall: () => css`
    max-width: 50rem;
  `,
  small: () => css`
    max-width: 65rem;
  `,
  medium: () => css`
    max-width: 70rem;
  `,
  large: () => css`
    max-width: 80rem;
  `,
  full: () => css`
    max-width: auto;
  `,
};

export const Wrapper = styled.div<{ isVisible?: boolean }>`
  ${({ isVisible }) => css`
    position: fixed;
    top: 0;
    z-index: 60;
    width: 100vw;
    height: 100vh;
    display: ${isVisible ? "block" : "none"};
  `}
`;

export const Container = styled.div<{ BottomPosition?: boolean }>`
  ${({ BottomPosition }) => css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: ${BottomPosition ? "flex-end" : "center"};
    justify-content: center;
  `}
`;

export const Content = styled.div<Partial<Props>>`
  ${({ size, isMessage }) => css`
    width: 100%;
    z-index: ${isMessage ? 63 : 62};
    ${modifier[size]};
  `}
`;

export const Overlay = styled.div<Partial<Props>>`
  ${({ theme, isVisible, isMessage }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${isMessage ? 61 : 60};
    background: ${isVisible ? theme.colors.black : "none"};
    opacity: 0.25;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  `}
`;
