import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Disclaimer = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: ${normalizeValue(3)};
    border-radius: ${normalizeValue(0.3)};
    border: 1px solid ${theme.colors.secondaryBackground};
    max-width: ${normalizeValue(45)};
  `}
`;
export const Close = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: ${normalizeValue(1)};
    top: ${normalizeValue(1)};
    width: ${normalizeValue(2)};
    height: ${normalizeValue(2)};
    padding: ${normalizeValue(0.6)};
    transition: background-color 0.2s ease-in;
    border-radius: ${normalizeValue(10)};
    svg {
      stroke: ${theme.colors.text};
      width: 100%;
      height: 100%;
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const DisclaimerContainer = styled.div<{ isSmall?: boolean }>`
  ${({ theme, isSmall }) => css`
    display: grid;
    grid-template-columns: min-content auto;
    align-items: center;
    gap: ${normalizeValue(1)};
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${isSmall ? normalizeValue(0.3) : normalizeValue(0.6)};
      width: ${isSmall ? normalizeValue(1.6) : normalizeValue(2.5)};
      height: ${isSmall ? normalizeValue(1.6) : normalizeValue(2.5)};
      background: ${theme.colors.orange};
      border-radius: ${normalizeValue(20)};
      svg {
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const DisclaimerMessage = styled.p`
  ${({ theme }) => css`
    line-height: 1.4;
    font-size: ${normalizeValue(1.3)};
    strong {
      margin-right: ${normalizeValue(0.3)};
    }
    a {
      margin-top: ${normalizeValue(0.4)};
      display: block;
      color: ${theme.colors.white}99;
    }
  `}
`;
