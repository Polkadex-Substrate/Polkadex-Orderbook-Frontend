import styled, { css } from "styled-components";

import { Colors } from "@polkadex/web-helpers";

export const Main = styled.section<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    grid-area: Graph;
    color: ${theme.colors.black};
    max-width: ${isFull ? "initial" : "70rem"};
  `}
`;
export const Content = styled.div`
  height: 100%;
`;

// Header
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  ul {
    list-style: none;
  }
`;
export const HeaderGrid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
`;

export const HeaderLeft = styled(HeaderGrid)`
  grid-template-columns: auto 1fr auto;
`;

export const HeaderRight = styled(HeaderGrid)`
  grid-template-columns: 1fr auto;
`;

export const HeaderLi = styled.li<{ isActive?: boolean; color?: Colors }>`
  ${({ theme, isActive, color = "none" }) => css`
    background: ${isActive ? theme.colors.primary : theme.colors[color]};
    color: ${isActive ? theme.colors.white : theme.colors.black};
    display: inline-block;
    padding: 0.8rem;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    vertical-align: middle;
    cursor: pointer;
    :not(:last-child) {
      margin-right: 0.5rem;
    }
    transition: background 0.2s ease-in-out;
    :hover {
      background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const HeaderActions = styled.div`
  ${({ theme }) => css`
    width: 2.8rem;
    height: 2.8rem;
    background: ${theme.colors.secondaryBackground};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const OriginalChart = styled.div``;
export const DepthChart = styled.div``;
export const TradingViewChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #c1c1c133;
`;
