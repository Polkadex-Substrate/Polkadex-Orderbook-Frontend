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

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    min-width: 35rem;
    height: max-content;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    flex-direction: column;
    /* max-height: 80vh; */
    height: 100%;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0 2rem;
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

export const Box = styled.div`
  padding: 1rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
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
  ${({ hasLocked }) => css`
    display: grid;
    grid-template-columns: ${hasLocked ? "1fr 1fr 1fr" : "1fr 1fr"};
    grid-gap: 1rem;
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    background: white;
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
  `}
`;
