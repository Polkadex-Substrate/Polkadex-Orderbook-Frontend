import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.div<{ hasLimit?: boolean; balances?: boolean }>`
  ${({ theme, hasLimit, balances }) => css`
    background: ${!hasLimit
      ? theme.colors.secondaryBackgroundSolid
      : "inherit"};
    border: 1px solid ${!hasLimit ? theme.colors.secondaryBackground : "none"};
    border-radius: ${normalizeValue(1.5)};
    padding: ${normalizeValue(1)} ${normalizeValue(1)}
      ${balances ? normalizeValue(4) : normalizeValue(1)}${normalizeValue(1)};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    ${!hasLimit &&
    css`
      max-width: ${normalizeValue(25)};
    `}
  `}
`;
export const EmptyHeader = styled.div`
  border-radius: ${normalizeValue(1.5)};
  padding: ${normalizeValue(1)};
  margin-bottom: ${normalizeValue(2)};
  flex: 1;
  img {
    width: 100%;
    max-width: ${normalizeValue(25)};
    max-height: ${normalizeValue(18)};
  }
`;
export const EmptyContent = styled.div`
  ${({ theme }) => css`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: ${normalizeValue(1.8)};
      font-weight: 550;
    }
    p {
      margin: ${normalizeValue(1)} 0 ${normalizeValue(3)} 0;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const EmptyActions = styled.div<{ hasLimit?: boolean }>`
  ${({ theme, hasLimit }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: ${hasLimit
      ? theme.colors.secondaryBackgroundOpacity
      : theme.colors.primaryBackgroundOpacity};
    border-radius: ${normalizeValue(1)};
    position: relative;
    max-width: ${normalizeValue(25)};

    &:hover a {
      &:nth-child(1) {
        &:hover {
          color: ${theme.colors.white};
        }
        color: ${theme.colors.text};
      }
      &:nth-child(2):hover {
        color: ${theme.colors.white};
        ~ div {
          left: 50%;
        }
      }
    }
    a {
      z-index: 1;
      padding: ${normalizeValue(1.5)};
      white-space: nowrap;
      font-weight: 500;
      &:nth-child(1) {
        color: ${theme.colors.white};
      }
      transition: color 0.5s ease-in-out;
    }

    div {
      position: absolute;
      width: 48%;
      height: 80%;
      background-color: ${theme.colors.primary};
      border-radius: ${normalizeValue(0.8)};
      left: 2%;
      z-index: 0;
      transition:
        left 0.5s ease-in-out,
        right 0.5s ease-in-out;
    }
  `}
`;
