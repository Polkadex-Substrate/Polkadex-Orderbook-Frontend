import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const UnlockAccount = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    position: relative;
    border-radius: ${normalizeValue(1.5)};
  `}
`;

export const UnlockButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: ${normalizeValue(2)};
    right: ${normalizeValue(2)};
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(10)};
    transition: background-color 0.3s ease-in-out;
    svg {
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
