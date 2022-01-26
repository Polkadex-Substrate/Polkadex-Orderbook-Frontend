import styled, { css } from "styled-components";

import { Colors } from "@polkadex/web-helpers";

export const Main = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    padding: 1.5rem;
    max-width: 70rem;
  `}
`;
export const Content = styled.div``;

// Header
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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
    font-weight: 500;
    display: inline-block;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.2rem;
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
    width: 3.5rem;
    height: 3.5rem;
    background: ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const OriginalChart = styled.div``;
export const DepthChart = styled.div``;
export const TradingViewChart = styled.div`
  img {
    width: 100%;
  }
`;
