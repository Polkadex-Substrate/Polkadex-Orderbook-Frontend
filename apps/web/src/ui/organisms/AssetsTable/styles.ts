import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;
    overflow: auto;
    max-height: 54vh;
    table {
      border-spacing: 0 ${normalizeValue(0.5)};
      border-collapse: separate;
      width: 100%;
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
        &:nth-child(even) td {
          background: ${theme.colors.tertiaryBackgroundOpacity};
        }
        td {
          text-align: right;
          cursor: pointer;

          &:first-child {
            border-top-left-radius: ${normalizeValue(1)};
            border-bottom-left-radius: ${normalizeValue(1)};
          }
          &:last-child {
            border-top-right-radius: ${normalizeValue(1)};
            border-bottom-right-radius: ${normalizeValue(1)};
          }
        }
      }
      tr:hover {
        td {
          transition: background-color ease 0.4s;
          background: ${theme.colors.secondaryBackground};
        }
      }

      th {
        opacity: 0.5;
        font-weight: normal;
        text-align: left;
        padding: 0 ${normalizeValue(1)} ${normalizeValue(1.5)}
          ${normalizeValue(1)};
        div {
          margin-left: ${normalizeValue(0.4)};
          display: inline-block;
          width: ${normalizeValue(0.8)};
        }
        &:not(:first-child) {
          text-align: right;
        }
      }
    }
  `}
`;

export const Thead = styled.th`
  ${({ theme }) => css`
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    text-align: right;
    svg {
      fill: ${theme.colors.text};
      width: 100%;
      height: 100%;
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
      padding: ${normalizeValue(0.1)} ${normalizeValue(0.2)};
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
      svg {
        width: 100%;
        height: 100%;
      }
      &:first-child {
        width: ${normalizeValue(3.5)};
        height: ${normalizeValue(3.5)};
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
