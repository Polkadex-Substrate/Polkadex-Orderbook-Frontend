import styled, { css } from "styled-components";

import { Props, StyleProps } from "./types";

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
  `,
  close: () => css`
    opacity: 0;
    pointer-events: none;
  `,
  right: () => css`
    left: 100%;
    margin-left: 1rem;
    margin-bottom: 1rem;
    bottom: 0;
  `,
  left: () => css`
    right: 100%;
    margin-right: 1rem;
    top: 0;
  `,
  top: () => css`
    bottom: 100%;
    margin-bottom: 1rem;
  `,
  bottom: () => css`
    top: 100%;
    margin-top: 1rem;
    right: 0;
  `,
};

export const Header = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    z-index: ${theme.layers.alwaysOnTop};
  `}
`;

export const Content = styled.div<Partial<Props>>`
  ${({ theme, direction }) => css`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: ${theme.layers.alwaysOnTop};
    width: max-content;
    ${wrapperModifiers[direction]};
  `}
`;

export const Overlay = styled.div<Pick<Props, "isOpacity">>`
  ${({ theme, isOpacity }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.layers.overlay};
    background: ${isOpacity ? theme.colors.primaryBackgroundOpacity : "none"};
    transition: opacity 0.5s ease-in-out;
  `}
`;

export const Wrapper = styled.div<StyleProps>`
  ${({ theme, isOpen }) => css`
    position: relative;
    width: fit-content;
    ${Content},
    ${Overlay} {
      transition: transform 0.2s ease-in, opacity ${theme.transition.default};
      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;
