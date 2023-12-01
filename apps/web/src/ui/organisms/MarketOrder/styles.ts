import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Section = styled.section`
  width: 100%;
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${normalizeValue(1)} 0;
`;
export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${normalizeValue(0.5)};
`;
export const DropdownTrigger = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.7)};
    padding: ${normalizeValue(0.6)} ${normalizeValue(0.8)};
    user-select: none;
    transition:
      background 0.4s ease-in-out,
      opacity 0.4s ease-in-out;
    svg {
      display: inline-block;
      vertical-align: middle;
      width: ${normalizeValue(0.8)};
      height: ${normalizeValue(0.8)};
    }
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;

export const ActionItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    border-radius: ${normalizeValue(0.7)};
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    font-weight: 500;
    padding: ${normalizeValue(0.6)} ${normalizeValue(1.5)};
    color: ${isActive ? theme.colors.white : theme.colors.text};
    user-select: none;
    &:first-child {
      background: ${isActive
        ? theme.colors.green
        : theme.colors.secondaryBackgroundOpacity};
    }
    &:last-child {
      background: ${isActive
        ? theme.colors.primary
        : theme.colors.secondaryBackgroundOpacity};
    }
    &:hover {
      background: ${isActive ? "auto" : theme.colors.secondaryBackground};
    }
  `}
`;

export const Content = styled.div``;
