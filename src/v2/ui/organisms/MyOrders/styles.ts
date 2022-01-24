import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 1.5rem;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.black};
    padding: 1rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      list-style: none;
    }
  `}
`;
export const HeaderLi = styled.div`
  ${({ theme = false }) => css`
    display: inline-block;
    font-weight: 500;
    cursor: pointer;
    :not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
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
  ${({ theme }) => css``}
`;
export const HeaderAsideLeft = styled.div`
  ${({ theme }) => css`
    ${HeaderLi} {
      padding: 1.5rem;
      border-radius: 1.2rem;
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
  padding: 2rem 0;
`;

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-gap: 2rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    color: ${theme.colors.black};
    margin: 0 1.5rem;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    span {
      font-weight: 550;
    }
    p {
      opacity: 0.6;
    }
    :not(:last-child) {
      margin-bottom: 1rem;
    }
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
      box-shadow: ${theme.shadows.quaternary};
    }
  `}
`;
export const CardBox = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 1rem;
`;
export const CardInfoToken = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    margin-right: 0.5rem;
  `}
`;
export const CardInfo = styled.div`
  padding: 1rem;
  align-self: center;
`;
export const CardActions = styled.div`
  ${({ theme }) => css`
    max-width: 22rem;
    height: 100%;
    padding: 1rem;
    border-left: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
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
