import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div``;

export const Header = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease-in-out;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    background: ${isActive ? theme.colors.inverse : theme.colors.text};
    ${Icon} svg {
      stroke: ${isActive ? theme.colors.text : theme.colors.inverse};
    }
    :hover {
      background: ${theme.colors.inverse};
      ${Icon} svg {
        stroke: ${theme.colors.text};
      }
    }
  `}
`;

export const Content = styled.div<{ hasMargin?: boolean; isWallet?: boolean }>`
  ${({ theme, hasMargin, isWallet }) => css`
    background: ${theme.colors.tertiaryBackground};
    min-width: 35rem;
    height: auto;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    max-height: ${!isWallet ? "92vh" : "95vh"};
    flex-direction: column;
    margin-left: ${hasMargin ? "1rem" : 0};
    margin-top: ${hasMargin ? "1rem" : 0};
    ${isWallet &&
    css`
      @media screen and (max-width: 860px) {
        height: fit-content;
        max-height: 50vh;
      }
    `}
  `}
`;

export const Title = styled.div<{ isWallet?: boolean }>`
  ${({ theme, isWallet }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0 2rem;
    ${isWallet &&
    css`
      @media screen and (max-width: 860px) {
        cursor: ${isWallet ? "pointer" : "initial"};
        padding-bottom: 2rem;
      }

      @media screen and (min-width: 860px) {
        ${Icon} {
          display: none;
        }
      }
    `}

    h3 {
      font-size: 1.6rem;
      font-weight: 550;
    }
    a {
      font-size: 1.2rem;
      background: ${theme.colors.primary}22;
      color: ${theme.colors.primary} !important;
      padding: 0.2rem 0.4rem;
      border-radius: 0.4rem;
      transition: background 0.3s ease-in-out;
      :hover {
        background: ${theme.colors.primary}33;
      }
    }
  `}
`;

export const Box = styled.div<{ isVisible?: boolean }>`
  ${({ isVisible }) => css`
    padding: 1rem;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 860px) {
      display: ${isVisible ? "flex" : "none"};
    }
  `}
`;

export const Search = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 10rem;
    padding: 1rem;
    display: flex;
    transition: border 0.3s ease-in-out;
    cursor: pointer;
    margin-bottom: 1rem;

    input {
      margin-left: 0.5rem;
      width: 100%;
      color: ${theme.colors.text};
    }
    :hover {
      border-color: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const FundsWrapper = styled.div<{ hasScroll?: boolean }>`
  ${({ hasScroll }) => css`
    overflow-y: ${hasScroll ? "scroll" : "hidden"};
    display: flex;
    flex-direction: column;
  `}
`;

export const FundsHeader = styled.div<{ hasLocked?: boolean }>`
  ${({ theme, hasLocked }) => css`
    display: grid;
    grid-template-columns: ${hasLocked ? "1fr 1fr 1fr" : "1fr 1fr"};
    grid-gap: 1rem;
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    background: ${theme.colors.tertiaryBackground};
    z-index: 2;
    span {
      opacity: 0.4;
      :not(:first-child) {
        text-align: right;
      }
    }
  `}
`;

export const FundsContent = styled.div``;

export const Card = styled.div<{ hasLocked?: boolean }>`
  ${({ theme, hasLocked }) => css`
    position: relative;
    user-select: none;
    border-radius: 1rem;
    padding: 1rem;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    display: grid;
    grid-template-columns: ${hasLocked ? "1fr 1fr 1fr" : "1fr 1fr"};
    grid-gap: 1rem;
    align-items: center;
    cursor: pointer;
    transition: box-shadow 0.5s ease-in-out;
    :hover {
      box-shadow: ${theme.shadows.tertiary};
    }
    :not(:last-child) {
      margin-bottom: 1rem;
    }
  `}
`;

export const CardWrapper = styled.div`
  ${({ theme }) => css`
    p {
      font-weight: 500;
    }
    :not(:first-child) {
      text-align: right;
    }
    :first-child {
      display: flex;
      align-items: center;
    }
    span {
      color: ${theme.colors.secondaryBackgroundDark};
    }
  `}
`;
export const CardInfo = styled.div`
  p {
    white-space: nowrap;
  }
  span {
    margin-left: 0.1rem;
  }
`;

export const CardIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    margin-right: 0.4rem;
    border-radius: 50%;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.white};
  `}
`;
