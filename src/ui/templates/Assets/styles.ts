import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  @media screen and (min-width: 590px) {
    padding: 4rem 4rem 10rem 4rem;
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
      width: 3rem;
      height: 3rem;
      padding: 0.8rem;
      border-radius: 10rem;
      border: 1px solid ${theme.colors.secondaryBackground};
      margin-right: 0.8rem;
      transition: border 0.5s ease-in;

      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
    }
    :hover {
      color: ${theme.colors.text};
      div {
        border-color: ${theme.colors.text};
      }
    }
  `}
`;

export const Download = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    span {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      vertical-align: middle;
      svg {
        fill: ${theme.colors.secondaryText};
      }
    }
  `}
`;

export const Container = styled.div`
  flex: 1;
  margin-top: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Content = styled.div`
  margin-top: 2.5rem;
`;

export const Search = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.inverse};
    padding: 0.8rem;
    border-radius: 3rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    overflow: hidden;
    display: flex;
    align-items: center;
    input {
      color: ${theme.colors.text};
      margin-left: 1rem;
    }
    ${Icon} {
      margin-left: 0.2rem;
      stroke: ${theme.colors.inverse};
    }
  `}
`;
export const CellFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const Cell = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    small {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const TokenIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 5rem;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.3rem;
    background: ${theme.colors.primaryBackground};
  `}
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    a {
      border-radius: 0.4rem;
      padding: 0.2rem 0.4rem;
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
      transition: background 0.4s ease-in-out;
      border: 1px solid ${theme.colors.secondaryBackground};
      :hover {
        background-color: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
export const Column = styled.strong`
  ${({ theme }) => css`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.tertiaryText};
  `}
`;
