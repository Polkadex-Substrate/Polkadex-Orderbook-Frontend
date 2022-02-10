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
      fill: ${isActive ? theme.colors.text : theme.colors.inverse};
    }
    :hover {
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
    min-width: 35rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    transition: all 0.3s ease-in-out;
    a {
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      transition: background 0.3s ease-in-out;
      ${Icon} {
        display: inline-block;
        margin-left: 0.5rem;
      }
      :hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const RecentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

export const Recent = styled.div`
  h5 {
    font-size: 1.4rem;
    font-weight: 500;
  }
  ul {
    list-style: none;
  }
`;
export const RecentLi = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: inline-block;
    padding: 0.5rem 0.6rem;
    border-radius: 1rem;
    cursor: pointer;
    background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackground};
    color: ${isActive ? theme.colors.white : theme.colors.text};
    transition: background 0.3s ease-in-out;
    font-weight: 500;
    font-size: 1.2rem;
    :hover {
      background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
    }
    :not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;

export const RecentContent = styled.div<{ isScrollable?: boolean }>`
  ${({ isScrollable }) => css`
    padding: 0.5rem;
    max-height: 33rem;
    overflow-y: ${isScrollable ? "scroll" : "hidden"};
    scrollbar-width: none;
  `}
`;

export const CardAction = styled.div`
  ${({ theme }) => css`
    visibility: hidden;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 5rem;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 50%;
    transform: translate(-15%, -50%);
    right: 0;
    z-index: 2;
    transition: opacity 0.6s ease-in-out;
    :hover {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const Card = styled.div<{ isRead?: boolean }>`
  ${({ theme, isRead }) => css`
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    transition: background 0.3s ease-in-out;
    opacity: ${isRead ? 1 : 0.5};
    cursor: pointer;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
      ${CardAction} {
        visibility: visible;
        opacity: 1;
      }
    }
  `}
`;

export const CardIcon = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 50%;
    border: 1px solid ${theme.colors.secondaryBackground};
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Read = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    background: ${theme.colors.primary};
    border-radius: 50%;
  `}
`;

export const CardContent = styled.div`
  small {
    font-size: 1.2rem;
    opacity: 0.6;
    line-height: 2;
  }
`;
