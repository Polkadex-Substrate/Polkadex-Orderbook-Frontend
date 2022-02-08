import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.section<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    grid-area: MyOrders;
    background: ${theme.colors.white};
    border-radius: 1.5rem;
    padding: 0.5rem;
    /* max-width: ${isFull ? "auto" : "80rem"}; */
    display: flex;
    flex-flow: column nowrap;
    /* height: 100%; */
    /* width: max-content; */
    width: 100%;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.black};
    padding: 0.8rem;
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
    color: ${isActive ? theme.colors.black : theme.colors.white};
    background: ${isActive ? theme.colors.white : "none"};
    ${Icon} {
      display: inline-block;
      vertical-align: middle;
      svg {
        fill: ${isActive ? theme.colors.black : theme.colors.white};
        stroke: ${isActive ? theme.colors.black : theme.colors.white};
      }
    }
  `}
`;

export const HeaderRightLi = styled(HeaderLi)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;

export const HeaderAsideLeft = styled.div`
  ${() => css`
    ${HeaderLi} {
      padding: 1rem;
      border-radius: 0.8rem;
      ${Icon} {
        margin-right: 0.5rem;
      }
    }
  `}
`;

export const HeaderAsideRight = styled.div`
  ${({ theme }) => css`
    ${HeaderLi} {
      border-radius: 0.8rem;
      font-size: 1.2rem;
      :nth-child(5) {
        ${Icon} {
          margin-left: 0.5rem;
        }
      }
      :not(:nth-child(1)) {
        background: ${theme.colors.secondaryBackground};
        padding: 0.8rem;
      }
    }
    @media screen and (max-width: 520px) {
      display: none;
    }
  `}
`;

export const Search = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    width: 2.9rem;
    height: 2.9rem;
  `}
`;

export const Content = styled.div`
  position: relative;
  flex: 1;
  padding: 0.7rem 0;
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
