import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div<{
  isVisible: boolean;
  hasBg?: boolean;
}>`
  ${({ theme, isVisible, hasBg }) => css`
    position: absolute;
    top: 0;
    background-color: ${theme.colors.primaryBackground}BF;
    padding: ${normalizeValue(1)};
    color: ${theme.colors.text};
    width: 100%;
    height: 100%;
    opacity: ${isVisible ? 1 : 0};
    visibility: ${isVisible ? "visible" : "hidden"};
    cursor: pointer;
    transition: opacity 0.6s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: ${hasBg ? theme.colors.secondaryBackgroundSolid : "none"};
      border: 1px solid ${hasBg ? theme.colors.secondaryBackground : "none"};
      padding: ${normalizeValue(2)};
      border-radius: ${normalizeValue(1.5)};
      scale: 1.5;
      p {
        text-align: center;
        margin-top: ${normalizeValue(1)};
        font-size: ${normalizeValue(1.3)};
      }
    }
    svg {
      stroke: ${theme.colors.primary};
      fill: ${theme.colors.primary};
      max-width: ${normalizeValue(2)};
      width: 100%;
      height: 100%;
    }
  `}
`;
