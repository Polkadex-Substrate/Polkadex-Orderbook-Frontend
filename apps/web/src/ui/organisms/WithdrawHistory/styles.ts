import { Tab } from "@headlessui/react";
import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TableWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    padding: ${normalizeValue(1)} ${normalizeValue(2)};
    gap: ${normalizeValue(2)};
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
    }
    @media screen and (max-width: 890px) {
      flex-direction: column;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(1)} ${normalizeValue(4)};
    }
  `}
`;
export const TableAside = styled.div<{ loading: boolean }>`
  ${({ theme, loading }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    button {
      padding: ${normalizeValue(1)} ${normalizeValue(4)};
      max-width: ${normalizeValue(14.5)};
      border-radius: ${normalizeValue(0.4)};
      background: ${loading
        ? theme.colors.primary
        : theme.colors.secondaryBackground};
      transition: background-color ease 0.4s;
      white-space: nowrap;
      &:hover {
        background: ${theme.colors.primaryHover};
      }
    }
    h4 {
      font-weight: 500;
      font-size: ${normalizeValue(1.4)};
    }
    @media screen and (max-width: 890px) {
      width: 100%;
    }
  `}
`;

export const Header = styled.div`
  padding: ${normalizeValue(1)} ${normalizeValue(2)};
  @media screen and (min-width: 1110px) {
    padding: ${normalizeValue(1)} ${normalizeValue(4)};
  }
  h3 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 550;
  }
`;

export const TabItem = styled(Tab)`
  flex: 1;
  padding: ${normalizeValue(1)} 0;
  text-align: left;
  opacity: 0.6;
  white-space: nowrap;
  &[data-headlessui-state="selected"] {
    opacity: 1;
  }
`;

export const TabList = styled(Tab.List)`
  ${({ theme }) => css`
    flex: 2;
    display: flex;
    align-items: center;
    gap: ${normalizeValue(2)};
    font-weight: 550;
    ${TabItem}:nth-child(1) {
      &[data-headlessui-state="selected"] {
        border-bottom: 2px solid ${theme.colors.orange};
      }
    }
    ${TabItem}:nth-child(2) {
      &[data-headlessui-state="selected"] {
        border-bottom: 2px solid ${theme.colors.primary};
      }
    }
    ${TabItem}:nth-child(3) {
      &[data-headlessui-state="selected"] {
        border-bottom: 2px solid ${theme.colors.green};
      }
    }
  `}
`;

export const TabItemPending = styled(TabItem)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    div {
      display: grid;
      place-items: center;
      width: ${normalizeValue(1.5)};
      height: ${normalizeValue(1.5)};
      background: ${theme.colors.primary};
      border-radius: ${normalizeValue(0.3)};
      padding: 0;
      font-size: ${normalizeValue(1.1)};
      font-weight: 550;
    }
  `}
`;

export const Container = styled.div`
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
      border-collapse: separate;
      padding: ${normalizeValue(1)} ${normalizeValue(1)};
      width: 100%;
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

export const Date = styled.div<{ isReverted?: boolean | null }>`
  ${({ theme, isReverted }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.1)};
    white-space: nowrap;
    span {
      background: ${isReverted ? "#E4A11B" : theme.colors.green}22;
      color: ${isReverted ? "#E4A11B" : theme.colors.green};
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
    padding: 0 ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    flex-direction: column-reverse;
    @media screen and (min-width: 700px) {
      flex-direction: row;
      align-items: center;
    }
    @media screen and (min-width: 1110px) {
      padding: 0 ${normalizeValue(4)};
    }
  `}
`;

export const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
  @media screen and (max-width: 700px) {
    padding-top: ${normalizeValue(1)};
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
