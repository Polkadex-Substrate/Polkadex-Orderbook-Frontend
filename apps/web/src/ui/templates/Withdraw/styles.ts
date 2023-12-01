import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;
export const UnlockAccount = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    position: relative;
  `}
`;

export const FlexContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }

  overflow: hidden;
`;
export const UnlockButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: ${normalizeValue(2)};
    right: ${normalizeValue(2)};
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(10)};
    transition: background-color 0.3s ease-in-out;
    svg {
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${normalizeValue(2)};
  overflow-y: scroll;
  @media screen and (min-width: 590px) {
    padding: 4rem;
  }
`;

export const Title = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryText};
    cursor: pointer;
    transition: color 0.5s ease-in;
    width: fit-content;
    div {
      vertical-align: middle;
      display: inline-block;
      width: ${normalizeValue(3)};
      height: ${normalizeValue(3)};
      padding: ${normalizeValue(0.8)};
      border-radius: ${normalizeValue(10)};
      border: 1px solid ${theme.colors.secondaryBackground};
      margin-right: ${normalizeValue(0.8)};
      transition: border 0.5s ease-in;

      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
    }
    &:hover {
      color: ${theme.colors.text};
      div {
        border-color: ${theme.colors.text};
      }
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
    background-image: url("/img/depositHero.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
    @media screen and (min-width: 830px) {
      background-position: bottom;
    }
    div {
      padding: 3.5rem;
    }
    h1 {
      font-size: ${normalizeValue(2.2)};
      font-weight: 550;
      margin-bottom: ${normalizeValue(1.5)};
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Container = styled.div`
  flex: 1;
  margin-top: ${normalizeValue(2)};
  display: grid;
  gap: ${normalizeValue(1)};
  @media screen and (min-width: 830px) {
    grid-template-columns: minmax(25rem, 30rem) 1fr;
  }
`;

export const Box = styled.div`
  margin-top: ${normalizeValue(2)};
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
  flex: 1;

  @media screen and (min-width: 830px) {
    padding: 8rem 4rem 4rem 4rem;
  }
  @media screen and (max-width: 830px) {
    padding-bottom: ${normalizeValue(5)};
  }
`;

export const SelectInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    user-select: none;
    span {
      display: block;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const SelectInputContainer = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding-bottom: ${normalizeValue(1)};
    margin-top: ${normalizeValue(1)};
    cursor: pointer;
    input {
      width: 100%;
      display: block;
      color: ${theme.colors.text};
    }
  `}
`;
export const Available = styled.span`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: ${normalizeValue(1.3)};
    margin-top: ${normalizeValue(1.2)};
    strong {
      color: ${theme.colors.text};
      font-weight: 500;
    }
  `}
`;

export const MAXButton = styled.button`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: ${normalizeValue(1.2)};
    margin-top: ${normalizeValue(1.2)};
    color: white;
    background: ${theme.colors.primary};
    border-radius: ${normalizeValue(0.3)};
    padding: 0.3rem 0.5rem 0.3rem ${normalizeValue(0.5)};
    margin-bottom: -${normalizeValue(0.5)};
    transition: background 0.2s ease-in;
    &:hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const SelectAccount = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(1)};
    align-items: center;
    div {
      &:first-child {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: ${normalizeValue(0.8)};
        padding: ${normalizeValue(0.8)};
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
        strong {
          font-size: ${normalizeValue(1.4)};
          font-weight: 500;
        }
        span {
          color: ${theme.colors.tertiaryText};
        }
        strong,
        span {
          display: block;
        }
      }
    }
  `}
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    justify-content: space-between;
    flex: 1;
    div {
      span {
        display: block;
      }
      &:first-child {
        display: flex;
        align-items: center;
        gap: ${normalizeValue(0.5)};
        span {
          width: ${normalizeValue(2)};
          height: ${normalizeValue(2)};
          border-radius: ${normalizeValue(10)};
          padding: ${normalizeValue(0.4)};
          background: ${theme.colors.secondaryBackgroundOpacity};
        }
      }
      &:last-child {
        span {
          width: ${normalizeValue(1)};
          height: ${normalizeValue(1)};
          svg {
            stroke: ${theme.colors.secondaryText};
          }
        }
      }
    }
  `}
`;

export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.8)};
    button {
      white-space: nowrap;
      font-size: ${normalizeValue(1.3)};
      padding: ${normalizeValue(1.2)};
      border-radius: ${normalizeValue(0.8)};
      transition: background 0.5s ease-in;
      text-align: left;
      width: 100%;
      &:first-child {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const Form = styled.div`
  @media screen and (min-width: 830px) {
    max-width: 40rem;
  }
  form {
    margin-top: ${normalizeValue(1.5)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2.5)};
  }
`;

export const History = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(1)};
    margin-top: 4rem;
    h2 {
      padding: ${normalizeValue(2)} ${normalizeValue(2)} 0 ${normalizeValue(2)};
      font-size: ${normalizeValue(1.8)};
      font-weight: 500;
    }
  `}
`;
export const HistoryWrapper = styled.div`
  max-height: 26rem;
  overflow-y: auto;
  height: fit-content;
  overflow-x: hidden;
`;

export const HistoryContent = styled.div`
  ${({ theme }) => css`
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(2)};
      background-color: ${theme.colors.tertiaryBackgroundOpacity};
    }
  `}
`;
export const HistoryTable = styled.div`
  ${({ theme }) => css`
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      background: ${theme.colors.secondaryBackground};
    }
    th,
    td {
      padding-right: ${normalizeValue(1)};
      padding-bottom: ${normalizeValue(1)};
      white-space: nowrap;
      vertical-align: top;
    }
    th:first-child,
    td:first-child {
      width: 17rem;
    }
  `}
`;

export const Cell = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.2)};
    vertical-align: middle;
    font-weight: 500;
    small {
      display: block;
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
    button {
      display: inline-block;
      width: ${normalizeValue(1.4)};
      height: ${normalizeValue(1.4)};
      vertical-align: middle;
      margin-right: ${normalizeValue(0.4)};
      svg {
        display: block;
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
export const HeaderColumn = styled.strong`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.2)};
    font-weight: 500;
    color: ${theme.colors.tertiaryText};
  `}
`;

export const HistoryTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${normalizeValue(1)} ${normalizeValue(2)} ${normalizeValue(1)}
      ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackground};

    strong {
      font-weight: 550;
      font-size: ${normalizeValue(1.5)};
    }
    button {
      width: fit-content;
      font-size: ${normalizeValue(1.2)};
      padding: ${normalizeValue(0.8)};
    }
  `}
`;

export const HistoryTabs = styled.div`
  display: flex;
  gap: ${normalizeValue(2)};
`;

export const HistoryHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${normalizeValue(2)};
    padding: 0 ${normalizeValue(2)};
    margin-top: ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (max-width: 600px) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  `}
`;
export const HistoryTab = styled.div<{
  isActive?: boolean;
  hasPendingClaims?: boolean;
}>`
  ${({ theme, isActive, hasPendingClaims }) => css`
    display: flex;
    gap: ${normalizeValue(0.2)};
    border-bottom: 2px solid;
    border-bottom-color: ${isActive ? theme.colors.primary : "transparent"};
    padding-bottom: ${normalizeValue(1.5)};
    opacity: ${isActive || hasPendingClaims ? 1 : 0.5};
    font-weight: ${hasPendingClaims ? "bold" : "normal"};
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    span {
      display: ${hasPendingClaims ? "flex" : "none"};
      font-size: ${normalizeValue(1)};
      background: ${theme.colors.primary};
      width: ${normalizeValue(1.6)};
      height: ${normalizeValue(1.6)};
      border-radius: ${normalizeValue(2)};
      align-items: center;
      justify-content: center;
      margin-top: -${normalizeValue(0.3)};
      padding-right: 1px;
      padding-bottom: 2px;
    }
  `}
`;
export const HistoryHeaderAside = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: ${normalizeValue(10)};
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8ba1be1;
`;
