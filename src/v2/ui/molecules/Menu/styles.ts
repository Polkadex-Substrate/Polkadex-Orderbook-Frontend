import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div``;

export const Header = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    background: ${isActive ? theme.colors.inverse : theme.colors.text};
    border-radius: 2rem;
    padding: 1rem;
    transition: background 0.3s ease-in-out;
    color: ${isActive ? theme.colors.text : theme.colors.inverse};
    user-select: none;
    ${Icon} {
      margin-right: 0.5rem;
      svg {
        fill: ${isActive ? theme.colors.text : theme.colors.inverse};
      }
    }
    :hover {
      color: ${theme.colors.text};
      background: ${theme.colors.inverse};
      ${Icon} svg {
        fill: ${theme.colors.text};
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: 60rem;
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${theme.colors.inverse};
    padding: 1rem 1rem 1rem 2rem;
    border-radius: 1rem;
    h3 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  `}
`;

export const Search = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    padding: 1rem;
    border-radius: 3rem;
    input {
      margin-left: 0.5rem;
    }
  `}
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 2rem;
  padding: 1.5rem;
`;

export const CardGroup = styled.div`
  ${({ theme }) => css`
    h4 {
      font-size: 1.3rem;
      font-weight: 550;
      margin-bottom: 1rem;
      margin-left: 1.5rem;
    }
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Card = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    transition: background 0.3s ease-in-out;
    border-radius: 1rem;
    padding: 1.5rem;
    cursor: pointer;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const CardContainer = styled.div`
  ${({ theme }) => css`
    margin-left: 1rem;
    div {
      small {
        font-size: 1.2rem;
        font-weight: 550;
      }
      span {
        background: ${theme.colors.primary};
        padding: 0.2rem 0.4rem;
        border-radius: 0.4rem;
        font-size: 1rem;
      }
    }
    p {
      opacity: 0.5;
      font-size: 1.1rem;
    }
  `}
`;
