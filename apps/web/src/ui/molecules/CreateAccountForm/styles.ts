import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(1.5)};
    border-radius: ${normalizeValue(0.4)};
    span {
      font-size: ${normalizeValue(1.2)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const WalletSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
  small {
    align-self: flex-end;
  }
`;

export const WalletSelectWrapper = styled(Container)<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${hasError ? theme.colors.red : "inherit"};
  `}
`;

export const WalletSelectArrow = styled.div`
  width: ${normalizeValue(0.8)};
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DropdownHeader = styled.p`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.3)};

    small {
      color: ${theme.colors.tertiaryText};
      font-size: ${normalizeValue(1.3)};
    }
  `}
`;

export const WalletSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.7)};
`;

export const WalletSelectContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${normalizeValue(1.3)};
      height: ${normalizeValue(1.3)};
      padding: ${normalizeValue(0.2)};
      border-radius: ${normalizeValue(10)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const WalletName = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
`;

export const WalletNameWrapper = styled(Container)`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      gap: ${normalizeValue(0.7)};
      flex: 1;
    }
    input {
      color: ${theme.colors.text};
    }
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: ${normalizeValue(0.3)};
      padding: ${normalizeValue(0.5)};
      font-weight: 500;
      font-size: ${normalizeValue(1.3)};
      transition: background-color 0.4s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const WalletError = styled.div<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    display: flex;
    justify-content: space-between;
    small,
    strong {
      font-size: ${normalizeValue(1.2)};
    }
    small {
      align-self: flex-end;
    }
    strong {
      font-weight: normal;
      color: ${isNegative ? theme.colors.red : "inherit"};
    }
    p {
      color: ${theme.colors.red};
      font-size: ${normalizeValue(1.3)};
    }
  `}
`;

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    margin-top: ${normalizeValue(0.5)};
    font-size: ${normalizeValue(1.3)};
  `}
`;

export const Password = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
`;

export const PasswordWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;
export const PasswordHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(0.5)};
`;

export const PasswordFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      color: ${theme.colors.text};
      width: 100%;
    }
    button {
      width: ${normalizeValue(1.5)};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(1)};
    button {
      border-radius: ${normalizeValue(0.3)};
      font-weight: 500;
      padding: ${normalizeValue(1)};
      &:first-child {
        background: ${theme.colors.secondaryBackground};
      }
      &:last-child {
        flex: 1;
        background: ${theme.colors.primary};
      }
      &:disabled {
        background: gray;
      }
    }
  `}
`;
