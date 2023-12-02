import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${normalizeValue(0.2)} ${normalizeValue(0.2)}
      ${normalizeValue(0.5)} ${normalizeValue(0.2)};
    border-radius: ${normalizeValue(0.5)};
    color: ${isActive && theme.colors.white};
    background-color: ${isActive
      ? theme.colors.primary
      : theme.colors.secondaryBackground};
    width: 100%;
    &:hover {
      background: ${isActive
        ? theme.colors.primary
        : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
