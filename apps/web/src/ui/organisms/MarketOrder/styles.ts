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
    font-size: ${normalizeValue(1.3)};
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
    font-size: ${normalizeValue(1.3)};
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

export const Content = styled.div<{ show: boolean }>`
  ${({ show }) => css`
    display: ${show ? "initial" : "none"};
  `}
`;

export const ProtectPassword = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 ${normalizeValue(2)} ${normalizeValue(2)}
      ${normalizeValue(2)};
    padding: ${normalizeValue(1)};
  `}
`;

export const ProtectPasswordTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${normalizeValue(1.5)};
  span {
    display: block;
    font-weight: 500;
  }
`;
export const ProtectPasswordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${normalizeValue(2)};
`;

export const Show = styled.button`
  ${({ theme }) => css`
    width: ${normalizeValue(2.2)};
    height: ${normalizeValue(2.2)};
    padding: ${normalizeValue(0.3)};
    transition: background 0.5s ease-in;
    border-radius: ${normalizeValue(10)};
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;

export const UnlockButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${normalizeValue(1.2)} ${normalizeValue(10)};
    font-size: ${normalizeValue(1.4)};
    font-weight: 500;
    border-radius: ${normalizeValue(1)};
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background: ${theme.colors.primary}99;
    }
    &:disabled {
      color: ${theme.colors.text};
      background: ${theme.colors.primaryBackground}99;
    }
  `}
`;
