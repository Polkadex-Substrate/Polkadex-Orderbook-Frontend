import styled, { css } from "styled-components";

import * as T from "./types";

const directionModifier = {
  top: () => css`
    bottom: calc(100% + 0.4em);
    left: 0;
  `,
  topCenter: () => css`
    bottom: calc(100% + 0.4em);
    left: 50%;
    transform: translateX(-50%);
  `,
  bottom: () => css`
    top: calc(100% + 0.4em);
    left: 0;
  `,
  bottomCenter: () => css`
    top: calc(100% + 0.4em);
    left: 50%;
    transform: translateX(-50%);
  `,
  right: () => css`
    bottom: 50%;
    transform: translateY(50%);
    right: calc(100% + 0.4em);
  `,
  left: () => css`
    top: 50%;
    transform: translateY(-50%);
    left: calc(100% + 0.4em);
  `,
};

export const Wrapper = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const Content = styled.div<Partial<T.TooltipContentProps>>`
  ${({
    theme,
    position = "top",
    minWidth = "100%",
    background = "secondaryBackgroundSolid",
    priority,
  }) => css`
    position: absolute;
    background: ${theme.colors[background]};
    box-shadow: ${theme.shadows.tertiary};
    padding: 0.5rem;
    border-radius: 0.5rem;
    min-width: ${minWidth};
    /* white-space: nowrap; */
    animation: fadeIn ease-in-out 0.4s;
    ${directionModifier[position]()}
    z-index: ${priority === "high" ? 10 : "auto"};
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
`;
