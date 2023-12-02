import Link from "next/link";
import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Table = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    width: 100%;
    max-height: ${normalizeValue(40)};
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    table {
      table-layout: auto;
      padding: ${normalizeValue(1)} ${normalizeValue(1)};
      width: 100%;
      border-collapse: separate;
      @media screen and (min-width: 1110px) {
        padding: ${normalizeValue(1)} ${normalizeValue(3)};
      }
      td {
        padding: ${normalizeValue(1.5)} ${normalizeValue(1)}
          ${normalizeValue(1.5)} ${normalizeValue(1)};
        border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        &.last {
          border-bottom: none;
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
      }
    }
  `}
`;

export const Thead = styled.th`
  ${({ theme }) => css`
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
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
    white-space: nowrap;
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
    div {
      &:first-child {
        width: ${normalizeValue(3.5)};
        height: ${normalizeValue(3.5)};
        padding: ${normalizeValue(0.5)};
        border-radius: ${normalizeValue(100)};
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: ${normalizeValue(0.1)};
        span {
          display: block;
          opacity: 0.5;
          text-transform: lowercase;
          &::first-letter {
            text-transform: uppercase;
          }
        }
      }
    }
  `}
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.1)};
  span {
    opacity: 0.5;
  }
`;

export const Wallet = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    white-space: nowrap;
    div {
      &:first-child {
        background: ${theme.colors.secondaryBackgroundOpacity};
        border-radius: ${normalizeValue(50)};
        width: ${normalizeValue(3)};
        height: ${normalizeValue(3)};
        padding: ${normalizeValue(0.8)};
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: ${normalizeValue(0.1)};
        span {
          opacity: 0.5;
        }
      }
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(1)} ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    flex-direction: column;
    @media screen and (min-width: 550px) {
      flex-direction: row;
      align-items: center;
    }
    h3 {
      font-size: ${normalizeValue(1.8)};
      font-weight: 550;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(1)} ${normalizeValue(4)};
    }
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  flex-direction: column;

  @media screen and (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${normalizeValue(2)};
`;

export const SkeletonComponent = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  flex-direction: column;
  padding: ${normalizeValue(2)};
`;

export const CustomLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryBackgroundDark};
  `}
`;
