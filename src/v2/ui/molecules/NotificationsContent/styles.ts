import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: 35rem;
    max-width: 40rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
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
export const CardActionContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  right: 0;
  z-index: 2;
  position: absolute;
  top: 50%;
  p {
    white-space: nowrap;
  }
`;

export const CardAction = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 5rem;
    width: 3rem;
    height: 3rem;

    transform: translate(-15%, -50%);

    transition: border-color 0.6s ease-in-out;
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
      ${CardActionContainer} {
        visibility: visible;
        opacity: 1;
      }
    }
  `}
`;

export const CardIcon = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    border-radius: 50%;
    border: 1px solid ${theme.colors.secondaryBackground};
    width: 3.6rem;
    height: 3.6rem;
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
  p,
  strong {
    word-break: break-all;
  }
  small {
    font-size: 1.2rem;
    opacity: 0.6;
    line-height: 2;
  }
  strong {
    font-size: 1.4rem;
    font-weight: 550;
  }
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    small {
      display: block;
      font-size: 1.2rem;
      color: ${theme.colors.tertiaryText};
    }
    a {
      background: ${theme.colors.primary}33;
      color: ${theme.colors.primary};
      padding: 0.3rem 0.4rem;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      border: 1px solid transparent;
      transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
      :hover {
        border-color: ${theme.colors.primary};
        background: transparent;
      }
    }
  `}
`;
