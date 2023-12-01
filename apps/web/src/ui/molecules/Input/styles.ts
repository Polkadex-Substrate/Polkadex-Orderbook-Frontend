import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(1)};
    background: ${theme.colors.secondaryBackgroundOpacity};
    label {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 600;
      width: 100%;
    }
    input {
      margin-top: ${normalizeValue(1)};
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.text};
      width: 100%;
    }
  `}
`;

export const Primary = styled.div``;

export const LineContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    input {
      width: 100%;
      display: block;
      margin-top: ${normalizeValue(1)};
      color: ${theme.colors.text};
    }
  `}
`;

export const InputLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
`;
export const LineBox = styled.div<{ error?: boolean }>`
  ${({ theme, error }) => css`
    border-bottom: 1px solid
      ${error ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    padding-bottom: ${normalizeValue(1)};
    display: flex;
    flex-direction: column;
    span {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const LabelBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Box = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(1.2)};
    border-radius: ${normalizeValue(1)};
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    label {
      font-size: ${theme.font.sizes.xsmall};
      width: 100%;
      color: ${theme.colors.black};
    }
    input {
      margin-top: ${normalizeValue(1)};
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.black};
      width: 100%;
    }
    span {
      color: ${theme.colors.primary};
    }
  `}
`;
export const PassCodeWrapper = styled.div`
  ${({ theme }) => css`
    span {
      margin-bottom: ${normalizeValue(1)};
      display: block;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const PassCode = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
`;

export const LinePassCode = styled.div<{ error?: boolean }>`
  ${({ theme }) => css`
    display: flex;
    input {
      width: 100%;
      text-align: center;
      color: ${theme.colors.text};
      border-radius: ${normalizeValue(0.4)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      width: 4rem;
      height: ${normalizeValue(5)};
      border: 2px solid ${theme.colors.transparent};
      :-webkit-outer-spin-button,
      :-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type="number"] {
        -moz-appearance: textfield !important;
      }
      &:disabled {
        background: gray;
        opacity: 0.6;
      }
      &::placeholder {
        opacity: 0.1;
      }
      &:focus {
        border: solid ${theme.colors.text}33;
      }
    }
  `}
`;
export const Error = styled.span<{ hasMargin?: boolean }>`
  ${({ theme, hasMargin = true }) => css`
    color: ${theme.colors.primary} !important;
    font-size: ${normalizeValue(1.2)};
    margin-left: ${hasMargin ? "1.3rem" : "none"};
  `}
`;

// Secondary Input

export const SecondaryWrapper = styled.div<{ hasLabel?: boolean }>`
  ${({ theme, hasLabel }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.2rem ${normalizeValue(0.8)};
    border-radius: ${normalizeValue(0.8)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    label {
      opacity: 0.6;
      font-weight: 500;
      white-space: nowrap;
    }
    div {
      display: flex;
      justify-content: ${hasLabel ? "flex-end" : "space-between"};
      flex: 1;
      text-align: ${hasLabel ? "end" : "start"};
    }
    input {
      color: ${theme.colors.text};
      text-align: ${hasLabel ? "end" : "start"};
      margin-right: ${normalizeValue(0.5)};
      font-size: ${theme.font.sizes.small};
      line-height: 0;
      width: 100%;
    }
  `}
`;

export const TabHeader = styled.div<{
  isActive?: boolean;
  isMarket?: boolean;
}>`
  ${({ theme, isMarket, isActive }) => css`
    border-bottom: 2px solid;
    border-bottom-color: ${isActive
      ? isMarket
        ? theme.colors.primary
        : theme.colors.green
      : "transparent"};
    opacity: ${isActive ? 1 : 0.7};
    padding: ${normalizeValue(1.2)};
    font-weight: 600;
    cursor: pointer;
    font-size: ${theme.font.sizes.xsmall};
  `}
`;
