import styled, { css } from "styled-components";

const sizeModifier = {
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
    max-width: inherit;
  `,
  fitContent: () => css`
    max-width: fit-content;
  `,
};

const wrapperModifiers = {
  open: () => css`
    pointer-events: auto;
    transform: translateY(0);
  `,
  close: () => css`
    pointer-events: none;
    transform: translateY(2rem);
  `,
};
export const Container = styled.div<{ isBottomPosition: boolean; isRightPosition?: boolean }>`
  ${({ isBottomPosition, isRightPosition }) => css`
    display: flex;
    align-items: ${isBottomPosition ? "flex-end" : "center"};
    justify-content: ${isRightPosition ? "flex-start" : "center"};
    width: 100%;
    height: 100%;
  `}
`;

export const Content = styled.div<{ size: string; isMessage: boolean }>`
  ${({ size, isMessage }) => css`
    width: 100%;
    z-index: ${isMessage ? 35 : 30};
    ${sizeModifier[size]()};
  `}
`;

export const Overlay = styled.div<{
  isMessage: boolean;
  isVisible: boolean;
}>`
  ${({ theme, isVisible, isMessage }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${isMessage ? 22 : theme.layers.menu}};
    background: ${isVisible ? theme.colors.overlayOpacity : "none"};
  `}
`;

export const Wrapper = styled.div<{ isMessage?: boolean; isVisible: boolean }>`
  ${({ theme, isMessage, isVisible }) => css`
    position: fixed;
    top: 0;
    z-index: ${isMessage ? 31 : 30};
    width: 100vw;
    height: 100vh;
    transition: opacity ${theme.transition.default};
    opacity: ${isVisible ? 1 : 0};
    visibility: ${isVisible ? "visible" : "hidden"};

    ${Container}, ${Overlay}, ${Content} {
      transition: transform 0.2s ease-in;
      ${isVisible && wrapperModifiers.open()}
      ${!isVisible && wrapperModifiers.close()}
    }
  `}
`;
