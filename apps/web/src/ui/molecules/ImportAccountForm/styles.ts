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

export const Method = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
  div {
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    input {
      margin-right: ${normalizeValue(0.5)};
    }
    label {
      &:last-child {
        opacity: 0.5;
      }
    }
  }
`;

export const Words = styled(Container)<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
    border: 1px solid ${hasError ? theme.colors.red : "inherit"};
  `}
`;
export const WordsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(1.5)};
      height: ${normalizeValue(1.5)};
      padding: ${normalizeValue(0.3)};
      border-radius: ${normalizeValue(10)};
      background: ${theme.colors.secondaryBackground};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
export const WordsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${normalizeValue(1)};
    div {
      padding: ${normalizeValue(0.3)} ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.5)};
      border: 1px solid ${theme.colors.secondaryBackground};
      width: fit-content;
    }
    input {
      color: ${theme.colors.text};
      width: 100%;
    }
  `}
`;
export const WorrdsFooter = styled.button`
  ${({ theme }) => css`
    margin-top: ${normalizeValue(1)};
    font-size: ${normalizeValue(1.2)};
    text-align: center;
    color: ${theme.colors.tertiaryText};
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
    }
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
      }
    }
  `}
`;

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
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
export const Menmonic = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
`;

export const Maintenance = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${normalizeValue(0.2)};
    text-align: center;
    img {
      max-width: ${normalizeValue(25)};
      width: 100%;
    }
    p {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Upload = styled(Container)<{
  isDragReject?: boolean;
  isDragAccept?: boolean;
}>`
  ${({ theme, isDragReject, isDragAccept }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${normalizeValue(0.2)};
    text-align: center;
    border: 2px dashed ${theme.colors.secondaryBackground};
    padding-top: ${normalizeValue(4)};
    padding-bottom: ${normalizeValue(4)};
    div {
      width: ${normalizeValue(2.5)};
      margin-bottom: ${normalizeValue(1)};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
    small {
      color: ${theme.colors.red};
      font-size: ${normalizeValue(1.3)};
    }

    ${isDragAccept &&
    css`
      border-color: ${theme.colors.green};
    `}
    ${isDragReject &&
    css`
      border-color: ${theme.colors.red};
    `}
  `}
`;

export const File = styled(Container)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    button {
      width: ${normalizeValue(2.5)};
      padding: ${normalizeValue(0.1)};
      border-radius: ${normalizeValue(10)};
      transition: background-color 0.4s ease;
      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
