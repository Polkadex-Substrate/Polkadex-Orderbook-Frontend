import styled, { css } from "styled-components";

import { Props } from "./types";

const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
  `,
  close: () => css`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  `,
  right: () => css`
    left: 100%;
    margin-left: 1rem;
    margin-bottom: 1rem;
    bottom: 0;
  `,
  bottomRight: () => css`
    left: 0;
    top: 100%;
  `,
  bottomLeft: () => css`
    right: 0;
    top: 100%;
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
    top: 120%;
    right: 0;
  `,
  1: () => css`
    ${Header} {
      z-index: 31;
    }
    ${Content} {
      z-index: 31;
    }
    ${Overlay} {
      z-index: 30;
    }
  `,
  2: () => css`
    ${Header} {
      z-index: 32;
    }
    ${Content} {
      z-index: 32;
    }
    ${Overlay} {
      z-index: 31;
    }
  `,
  3: () => css`
    ${Header} {
      z-index: 33;
    }
    ${Content} {
      z-index: 33;
    }
    ${Overlay} {
      z-index: 32;
    }
  `,
};

export const Header = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Content = styled.div<Partial<Props>>`
  ${({ direction }) => css`
    display: flex;
    flex-direction: column;
    position: absolute;
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
    background: ${isOpacity ? theme.colors.overlay : "none"};
    transition: opacity 0.5s ease-in-out;
  `}
`;

export const Wrapper = styled.div<{ isOpen?: boolean; variant?: number }>`
  ${({ theme, isOpen, variant }) => css`
    position: relative;
    ${wrapperModifiers[variant]};
    ${Content},
    ${Overlay} {
      transition: transform 0.2s ease-in, opacity ${theme.transition.default};
      ${isOpen && wrapperModifiers.open()}
      ${!isOpen && wrapperModifiers.close()}
    }
  `}
`;
