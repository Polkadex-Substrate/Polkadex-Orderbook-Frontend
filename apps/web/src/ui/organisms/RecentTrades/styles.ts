import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 1180px) {
    width: 50%;
  }
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export const Main = styled.div<{ hasData?: boolean }>`
  ${({ theme, hasData }) => css`
    background: ${hasData
      ? theme.colors.inverse
      : theme.colors.tertiaryBackground};
    display: flex;
    flex-flow: column;
    flex: 1;
    border-radius: 0 ${normalizeValue(2)} ${normalizeValue(2)} 0;
    min-width: ${normalizeValue(28)};
    width: 100%;
    max-height: 540px;
    height: 50vh;

    @media screen and (min-height: 1200px) {
      max-height: 660px;
    }
  `}
`;
export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75%;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${normalizeValue(1)} ${normalizeValue(1)} 0 ${normalizeValue(1)};
  margin-bottom: ${normalizeValue(1)};
  h2 {
    font-size: ${normalizeValue(1.5)};
    font-weight: 550;
  }
`;

export const DropdownTrigger = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.7)};
    padding: ${normalizeValue(0.4)} ${normalizeValue(0.6)};
    user-select: none;
    text-transform: capitalize;
    transition:
      background 0.4s ease-in-out,
      opacity 0.4s ease-in-out;
    font-size: ${normalizeValue(1.2)};
    svg {
      display: inline-block;
      vertical-align: middle;
      width: ${normalizeValue(0.8)};
      height: ${normalizeValue(0.8)};
    }
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const DropdownMenuItem = styled.div`
  text-transform: capitalize;
`;
export const Content = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${normalizeValue(0.5)};
    flex: 1;
    height: 100%;
    overflow: auto;

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
  `}
`;

export const Head = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 2;
    background: ${theme.colors.tertiaryBackground};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 ${normalizeValue(1)};
    margin-bottom: ${normalizeValue(0.5)};
    span {
      opacity: 0.5;
    }
  `}
`;

export const CellHead = styled.span`
  font-size: ${normalizeValue(1.2)};
  justify-self: flex-end;
  &:not(:last-child) {
    justify-self: flex-start;
  }
`;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 ${normalizeValue(0.6)} 0 ${normalizeValue(1)};
    font-weight: 500;
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(0.1)};
    }
    ${CardCell} {
      &:first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const CardCell = styled.span`
  padding: ${normalizeValue(0.4)} 0;
  font-size: ${normalizeValue(1.2)};
  &:not(:first-child) {
    justify-self: flex-end;
  }
  &:nth-child(2) {
    justify-self: flex-start;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.div`
  text-align: center;
  padding: ${normalizeValue(5)} ${normalizeValue(1)};
  img {
    margin-bottom: ${normalizeValue(1)};
    max-width: ${normalizeValue(22)};
  }
`;
