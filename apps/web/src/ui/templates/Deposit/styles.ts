import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    max-width: ${normalizeValue(160)};
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;
export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${normalizeValue(2)};
  overflow-y: scroll;
  @media screen and (min-width: 590px) {
    padding: ${normalizeValue(4)} ${normalizeValue(4)} ${normalizeValue(10)}
      ${normalizeValue(4)};
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
      padding: ${normalizeValue(3.5)};
    }
    h1 {
      font-size: ${normalizeValue(2.2)};
      font-weight: 600;
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
    grid-template-columns: minmax(${normalizeValue(25)}, ${normalizeValue(30)}) 1fr;
  }
`;

export const Box = styled.div`
  margin-top: ${normalizeValue(2)};
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
  flex: 1;
  @media screen and (min-width: 830px) {
    padding: ${normalizeValue(8)} ${normalizeValue(4)} ${normalizeValue(4)}
      ${normalizeValue(4)};
  }
`;

export const Form = styled.div`
  @media screen and (min-width: 830px) {
    max-width: ${normalizeValue(40)};
  }
  form {
    margin-top: ${normalizeValue(1.5)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2.5)};
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
    margin-bottom: ${normalizeValue(1)};
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
    background: ${theme.colors.green};
    border-radius: ${normalizeValue(0.3)};
    padding: ${normalizeValue(0.3)} ${normalizeValue(0.5)}
      ${normalizeValue(0.3)} ${normalizeValue(0.5)};
    margin-bottom: ${normalizeValue(-0.5)};
    transition: background 0.2s ease-in;
    &:hover {
      background: ${theme.colors.green}88;
    }
  `}
`;

export const SelectAccountAvatar = styled.div``;
export const Success = styled.div`
  h3 {
    margin-bottom: ${normalizeValue(1)};
  }
`;

export const SelectAccount = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(1)};
    align-items: center;
    div {
      &:first-child {
        min-width: ${normalizeValue(3.5)};
        min-height: ${normalizeValue(3.5)};
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

export const History = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(1)};
    margin-top: ${normalizeValue(4)};
    padding-bottom: ${normalizeValue(3)};
    flex: 1;
    h2 {
      font-size: ${normalizeValue(1.8)};
      font-weight: 500;
      padding: ${normalizeValue(2)} ${normalizeValue(3)};
    }
  `}
`;
export const HistoryContent = styled.div`
  ${({ theme }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
      padding-bottom: ${normalizeValue(1.5)};
    }
  `}
`;
export const Status = styled.span<{ color: string }>`
  ${({ theme, color }) => css`
    background: ${theme.colors[color]};
    color: ${theme.colors.white};
    font-size: ${normalizeValue(1.1)};
    padding: ${normalizeValue(0.3)};
    border-radius: ${normalizeValue(0.4)};
  `}
`;

export const Cell = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-weight: 500;
`;

export const CellName = styled(Cell)`
  padding-left: ${normalizeValue(1)};
`;

export const Cellamount = styled(Cell)``;
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
    strong {
      font-weight: normal;
      font-size: ${normalizeValue(1.5)};
    }
    button {
      color: ${theme.colors.tertiaryText};
      font-size: ${normalizeValue(1.2)};
      padding: ${normalizeValue(0.6)};
      transition:
        background 0.3s ease-in,
        border 0.3s ease-in;
      background: ${theme.colors.primary}22;
      color: ${theme.colors.primary};
      border-radius: ${normalizeValue(0.8)};
      border: 1px solid;
      border-color: transparent;
      &:hover {
        background: transparent;
        border-color: ${theme.colors.primary};
      }
    }
  `}
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
