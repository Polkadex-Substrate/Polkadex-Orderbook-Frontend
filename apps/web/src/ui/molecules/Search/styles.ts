import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<{ isFull?: boolean; hasBorder?: boolean }>`
  ${({ theme, isFull, hasBorder }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: ${isFull ? "100%" : "3rem"};
    height: ${normalizeValue(3)};
    border-radius: ${normalizeValue(20)};
    border: ${hasBorder
      ? `1px solid ${theme.colors.secondaryBackground}`
      : "none"};
    transition:
      width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
      border 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      width: 100%;
      border-color: ${theme.colors.text};
    }
    button {
      padding: 0 ${normalizeValue(0.7)};
      height: 100%;
    }
    input {
      color: ${theme.colors.text};
      margin-left: ${normalizeValue(0.3)};
      width: 100%;
    }
  `}
`;
