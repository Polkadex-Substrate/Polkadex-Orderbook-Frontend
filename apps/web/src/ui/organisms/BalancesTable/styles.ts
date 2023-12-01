import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    max-height: 54vh;
    table {
      border-spacing: 0 ${normalizeValue(0.5)};
      border-collapse: separate;
      width: 100%;
      padding: ${normalizeValue(1)} ${normalizeValue(1)};
      @media screen and (min-width: 1110px) {
        padding: ${normalizeValue(1)} 3rem;
      }
      td {
        padding: ${normalizeValue(1)};
      }
      tr {
        &.active td {
          border-top: 1px solid ${theme.colors.primary};
          border-bottom: 1px solid ${theme.colors.primary};
          &:last-child {
            border-right: 1px solid ${theme.colors.primary};
          }
          &:first-child {
            border-left: 1px solid ${theme.colors.primary};
          }
        }
        &:not(:last-child) td {
          border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        }
        td {
          cursor: pointer;
        }
      }
      tr:hover {
        td {
          transition: background-color ease 0.4s;
          background: ${theme.colors.tertiaryBackgroundOpacity};
        }
      }

      th {
        opacity: 0.5;
        font-weight: normal;
        text-align: left;
        padding: 0 ${normalizeValue(1)} 1.5rem ${normalizeValue(1)};
        div {
          margin-left: ${normalizeValue(0.4)};
          display: inline-block;
          width: ${normalizeValue(0.8)};
        }
      }
    }
  `}
`;

export const Thead = styled.th<{ isActionTab?: boolean }>`
  ${({ theme, isActionTab }) => css`
    white-space: nowrap;
    cursor: ${isActionTab ? "default" : "pointer"};
    user-select: none;
    text-align: right;
    svg {
      fill: ${theme.colors.text};
      path {
        opacity: 0.5;
      }
    }
    &.desc svg path:first-child {
      opacity: 1;
    }
    &.asc svg path:last-child {
      opacity: 1;
    }
  `}
`;

export const Date = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.1)};
    span {
      background: ${theme.colors.green}22;
      color: ${theme.colors.green};
      width: fit-content;
      padding: 0.1rem ${normalizeValue(0.2)};
      border-radius: ${normalizeValue(0.2)};
      font-size: ${normalizeValue(1.2)};
    }
  `}
`;

export const Token = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.5)};
    text-align: left;
    div {
      &:first-child {
        width: 3.5rem;
        height: 3.5rem;
        padding: ${normalizeValue(0.5)};
        border-radius: ${normalizeValue(100)};
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
        display: flex;
        text-align: left;
        flex-direction: column;
        gap: ${normalizeValue(0.1)};
        span {
          font-weight:;
        }
        p {
          opacity: 0.5;
          &::first-letter {
            text-transform: uppercase;
          }
          text-transform: lowercase;
        }
      }
    }
  `}
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(2)};
    a {
      padding: ${normalizeValue(0.5)} ${normalizeValue(0.8)};
      border-radius: ${normalizeValue(0.2)};
      transition: background-color 0.5s ease;
      white-space: nowrap;
      font-weight: 500;
      font-size: ${normalizeValue(1.3)};
      &:nth-child(1),
      &:nth-child(2) {
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
        &:hover:not(:disabled) {
          background: ${theme.colors.secondaryBackground};
        }
      }
      &:nth-child(3) {
        color: ${theme.colors.white};
        background: ${theme.colors.primary};
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryHover};
        }
      }

      &:disabled {
        background: gray;
        cursor: not-allowed;
      }

      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
  `}
`;
export const Icon = styled.div`
  width: ${normalizeValue(1.5)};
  height: ${normalizeValue(1.5)};
  display: inline-block;
  vertical-align: middle;
  margin-right: ${normalizeValue(0.5)};
`;

export const TooltipMessage = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    color: ${theme.colors.inverse};
  `}
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.1)};
  span {
    font-weight: 500;
  }
  p {
    opacity: 0.5;
  }
`;

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${normalizeValue(2)};
`;
