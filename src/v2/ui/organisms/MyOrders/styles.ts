import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { Card as OrderHistoryCard } from "@orderbook/v2/ui/molecules/OrderHistory/styles";

export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: MyOrders;
    background: ${theme.colors.inverse};
    border-radius: 1.5rem;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    overflow: auto;
  `}
`;
export const Header = styled.div`
  padding: 0.5rem;
`;

export const HeaderWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    padding: 0.5rem;
    border-radius: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      list-style: none;
    }
  `}
`;

export const HeaderLi = styled.div`
  display: inline-block;
  font-weight: 500;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const HeaderLeftLi = styled(HeaderLi)<{ isActive?: boolean }>`
  ${({ theme, isActive = false }) => css`
    color: ${isActive ? theme.colors.text : theme.colors.inverse};
    background: ${isActive ? theme.colors.inverse : "none"};
    ${Icon} {
      display: inline-block;
      vertical-align: middle;
      svg {
        fill: ${isActive ? theme.colors.text : theme.colors.inverse};
        stroke: ${isActive ? theme.colors.text : theme.colors.inverse};
      }
    }
  `}
`;

export const HeaderAsideLeft = styled.div`
  ${() => css`
    ${HeaderLi} {
      padding: 0.7rem;
      border-radius: 0.8rem;
      ${Icon} {
        margin-right: 0.5rem;
      }
    }
  `}
`;

export const HeaderAsideRight = styled.div`
  ul {
    display: flex;
  }
  @media screen and (max-width: 520px) {
    display: none;
  }
`;

export const HeaderRightLi = styled(HeaderLi)<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: ${isActive ? theme.colors.inverse : theme.colors.secondaryBackground};
    transition: background 0.4s ease-in-out;
    :hover {
      background: ${isActive ? theme.colors.inverse : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
export const HeaderRightExpand = styled(HeaderLi)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    border-radius: 0.8rem;
    color: ${theme.colors.inverse};
    background: ${theme.colors.secondaryBackground};
  `}
`;

export const Search = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.inverse};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    width: 2.8rem;
    height: 2.8rem;
    vertical-align: middle;
  `}
`;

export const Content = styled.div`
  position: relative;
  flex: 1;
  padding: 0;
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  :hover ${OrderHistoryCard} {
    opacity: 1;
  }
`;
