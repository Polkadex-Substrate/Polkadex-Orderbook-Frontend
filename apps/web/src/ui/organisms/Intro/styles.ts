import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Intro = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    background: ${theme.colors.primaryBackgroundSolid};
    padding: ${normalizeValue(2)};
    border-radius: ${normalizeValue(1)};
  `}
`;

export const IntroActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(1)};
  flex-wrap: wrap;
`;

export const IntroButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    button {
      transition: background-color 0.5s ease;
      padding: ${normalizeValue(1)};
      border-radius: ${normalizeValue(0.4)};
      &:last-child {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const IntroSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;
