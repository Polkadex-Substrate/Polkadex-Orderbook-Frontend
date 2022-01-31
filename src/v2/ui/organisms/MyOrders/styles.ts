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

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 3fr fit-content(100%);
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    color: ${theme.colors.black};
    margin: 0 0.5rem;
    transition: border 0.4s ease-in-out;
    user-select: none;
    cursor: pointer;
    span {
      font-weight: 550;
    }
    p {
      opacity: 0.6;
    }
    :not(:last-child) {
      margin-bottom: 0.7rem;
    }
    :hover {
      border-color: ${theme.colors.black};
      box-shadow: ${theme.shadows.quaternary};
    }

    /* @media screen and (max-width: 990px) {
      width: max-content;
    } */
    :hover ${Tag} {
      visibility: visible;
      opacity: 1;
    }
  `}
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 2rem;

  overflow: overlay;
  ::-webkit-scrollbar {
    height: 0;
  }
`;

export const CardBox = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 0.5rem;
  min-width: 21rem;
`;

export const CardInfoToken = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    margin-right: 0.5rem;
  `}
`;

export const Tag = styled.span<{ isSell?: boolean }>`
  ${({ theme, isSell = false }) => css`
    position: absolute;
    bottom: -0.5rem;
    right: 50%;
    transform: translate(50%, 0);
    color: ${theme.colors.white};
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    padding: 0.2rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    width: fit-content;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  `}
`;

export const CardInfo = styled.div`
  padding: 1rem;
  align-self: center;
  min-width: 10rem;
`;

export const CardActions = styled.div`
  ${({ theme }) => css`
    position: sticky;
    right: 0;
    min-width: 15.3rem;
    background: ${theme.colors.white};
    height: 100%;
    padding: 1rem;
    border-left: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    ul {
      list-style: none;
      li {
        font-size: 1.1rem;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
        padding: 0.5rem;
        display: inline-block;
        transition: opacity 0.4s ease-in-out;
        :not(:last-child) {
          margin-right: 0.3rem;
        }
        :hover {
          opacity: 0.5;
        }
      }
    }
  `}
`;

export const Deposit = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.green};
  `}
`;

export const Cancel = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`;
