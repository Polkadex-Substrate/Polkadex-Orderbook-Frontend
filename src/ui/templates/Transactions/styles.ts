import styled, { css } from "styled-components";

import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Transactions;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.5rem 0;
  `}
`;

// Header
export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    border-bottom: 1px solid;
    border-bottom-color: ${theme.colors.secondaryBackground};
    @media screen and (min-width: 700px) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    ul {
      list-style: none;
    }
  `}
`;
export const HeaderTabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const Content = styled.div`
  margin-top: 1rem;
  overflow: overlay;
  @media screen and (min-width: 1055px) {
    max-height: 36vh;
  }
  @media screen and (max-width: 1055px) {
    max-height: 36rem;
  }
`;

export const Tab = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: inline-block;
    cursor: pointer;
    opacity: ${isActive ? 1 : 0.6};
    font-weight: 550;
    font-size: 1.2rem;
    :not(:last-child) {
      margin-right: 1.5rem;
    }
    position: relative;

    :before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      border-bottom: 2px solid;
      border-bottom-color: ${isActive ? theme.colors.primary : "transparent"};
      bottom: -90%;
    }
  `}
`;

export const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${Button} {
    margin-left: 0.5rem;
  }
  @media screen and (max-width: 590px) {
    margin-top: 2.5rem;
  }
`;
