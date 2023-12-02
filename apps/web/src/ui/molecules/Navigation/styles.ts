import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    max-width: ${isFull ? "inherit" : normalizeValue(35)};
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: ${normalizeValue(35)};
    border-radius: ${normalizeValue(1)};
    border: 1px solid ${theme.colors.secondaryBackground};
    padding: ${normalizeValue(2)};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${normalizeValue(2)};
  span {
    display: block;
    font-size: ${normalizeValue(1.6)};
    font-weight: 550;
    margin-left: ${normalizeValue(1)};
  }
`;

export const Action = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${normalizeValue(1)};
    border-radius: 50%;
    transition: background 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;

export const Content = styled.div``;
