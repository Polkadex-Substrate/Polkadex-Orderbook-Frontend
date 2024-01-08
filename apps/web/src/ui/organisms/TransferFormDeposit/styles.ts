import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
  flex: 1;
  transition: all ease 0.2s;
  backface-visibility: hidden;
`;

export const Wallets = styled.div`
  ${({ theme }) => css`
    display: flex;
    transition: flex-direction ease 0.2s;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.5)};
    padding: ${normalizeValue(0.5)};
    flex-direction: row;
    @media screen and (max-width: 880px) {
      flex-direction: column;
    }
  `}
`;

export const WalletsButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${normalizeValue(0.5)};
    background: ${theme.colors.green};
    padding: ${normalizeValue(0.8)};
    border-radius: ${normalizeValue(0.4)};
    svg {
      width: ${normalizeValue(1.8)};
      height: ${normalizeValue(1.8)};
    }
    span {
      font-size: ${normalizeValue(1.1)};
      font-weight: 500;
    }
    &:disabled {
      background: gray;
      cursor: not-allowed;
      padding: ${normalizeValue(0.8)} ${normalizeValue(1.7)};
      span {
        display: none;
      }
    }
  `}
`;

export const Form = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.5)};
    flex-direction: column;
    @media screen and (min-width: 640px) {
      flex-direction: row;
      align-items: center;
    }
  `}
`;

export const Errors = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(1.3)};
      height: ${normalizeValue(1.3)};
      svg {
        fill: ${theme.colors.primary};
      }
    }
    background: ${theme.colors.white};
    border-radius: ${normalizeValue(0.5)};
    padding: ${normalizeValue(0.8)};
    p {
      color: ${theme.colors.inverse};
    }
  `}
`;

export const Token = styled.div``;

export const Amount = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(2.8)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    @media screen and (max-width: 640px) {
      border-top: 1px solid ${theme.colors.secondaryBackground};
    }
    @media screen and (min-width: 640px) {
      border-left: 1px solid ${theme.colors.secondaryBackground};
    }
    div {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: ${normalizeValue(0.4)};
      span {
        opacity: 0.5;
      }
      input {
        width: 100%;
        font-size: ${normalizeValue(1.6)};
        font-weight: 600;
        color: ${theme.colors.text};
      }
    }
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.5)};
      transition: background-color 0.5s ease;
      font-size: ${normalizeValue(1.1)};
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryBackground};
      }
      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
  `}
`;

export const Footer = styled.div<{ hasUser: boolean }>`
  ${({ theme, hasUser }) => css`
    flex: 1;
    button {
      background: ${hasUser ? theme.colors.green : theme.colors.primary};
      padding: ${normalizeValue(1.4)};
      border-radius: ${normalizeValue(0.5)};
      width: 100%;
      transition: background-color 0.5s ease;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      ${hasUser &&
      css`
        &:hover:not(:disabled) {
          background: ${theme.colors.gradientGreen};
        }
      `}
    }
  `}
`;
