import { Tab } from "@headlessui/react";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TableWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    padding: 1rem 2rem;
    gap: 2rem;
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
    }
    @media screen and (max-width: 890px) {
      flex-direction: column;
    }
    @media screen and (min-width: 1110px) {
      padding: 1rem 4rem;
    }
  `}
`;
export const TableAside = styled.div<{ loading: boolean }>`
  ${({ theme, loading }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    button {
      padding: 1rem 4rem;
      max-width: 14.5rem;
      border-radius: 0.4rem;
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
      font-size: 1.4rem;
    }
    @media screen and (max-width: 890px) {
      width: 100%;
    }
  `}
`;

export const Header = styled.div`
  padding: 1rem 2rem;
  @media screen and (min-width: 1110px) {
    padding: 1rem 4rem;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 550;
  }
`;

export const TabItem = styled(Tab)`
  flex: 1;
  padding: 1rem 0;
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
    gap: 2rem;
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
    gap: 0.5rem;
    div {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      background: ${theme.colors.primary};
      border-radius: 0.3rem;
      padding: 0;
      font-size: 1.1rem;
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
    max-height: 40rem;
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
      padding: 1rem 1rem;
      width: 100%;
      @media screen and (min-width: 1110px) {
        padding: 1rem 3rem;
      }
      td {
        padding: 1.5rem 1rem 1.5rem 1rem;
        border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        &.last {
          border-bottom: none;
        }
      }
      th {
        opacity: 0.5;
        font-weight: normal;
        text-align: left;
        padding: 0 1rem 1.5rem 1rem;

        div {
          margin-left: 0.4rem;
          display: inline-block;
          width: 0.8rem;
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
    gap: 0.1rem;
    white-space: nowrap;
    span {
      background: ${theme.colors.green}22;
      color: ${theme.colors.green};
      width: fit-content;
      padding: 0.1rem 0.2rem;
      border-radius: 0.2rem;
      font-size: 1.2rem;
    }
  `}
`;

export const Token = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    div {
      &:first-child {
        width: 3.5rem;
        height: 3.5rem;
        padding: 0.5rem;
        border-radius: 100rem;
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
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
  gap: 0.1rem;
  span {
    opacity: 0.5;
  }
`;

export const Wallet = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;

    div {
      &:first-child {
        background: ${theme.colors.secondaryBackgroundOpacity};
        border-radius: 50rem;
        width: 3rem;
        height: 3rem;
        padding: 0.8rem;
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
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
    gap: 1rem;
    padding: 0 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    flex-direction: column-reverse;
    @media screen and (min-width: 700px) {
      flex-direction: row;
      align-items: center;
    }
    @media screen and (min-width: 1110px) {
      padding: 0 4rem;
    }
  `}
`;

export const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 700px) {
    padding-top: 1rem;
  }
`;

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
`;

export const SkeletonComponent = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 2rem;
`;
