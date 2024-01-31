import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(0.4)} ${normalizeValue(1)};
    background: ${theme.colors.primaryBackground};
    z-index: 1;
    p {
      font-size: ${normalizeValue(1.2)};
    }
  `}
`;

export const Container = styled.div<{ color?: string }>`
  ${({ theme, color }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    span {
      font-size: ${normalizeValue(1.2)};
      color: ${color && theme.colors[color]};
    }
    svg {
      width: ${normalizeValue(1)};
      fill: ${color && theme.colors[color]};
      stroke: ${color && theme.colors[color]};
    }
  `}
`;
