import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: ${normalizeValue(35)};
    max-width: 40rem;
    border-radius: ${normalizeValue(1)};
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Title = styled.div`
  padding: ${normalizeValue(2)};
  div {
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: ${normalizeValue(1.6)};
      font-weight: 550;
    }
  }
`;

export const RecentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${normalizeValue(2)};
`;

export const Recent = styled.div`
  h5 {
    font-size: ${normalizeValue(1.4)};
    font-weight: 500;
  }
  ul {
    list-style: none;
  }
`;
export const RecentLi = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: inline-block;
    padding: ${normalizeValue(0.5)} ${normalizeValue(0.6)};
    border-radius: ${normalizeValue(1)};
    cursor: pointer;
    background: ${isActive
      ? theme.colors.primary
      : theme.colors.secondaryBackground};
    color: ${isActive ? theme.colors.white : theme.colors.text};
    transition: background 0.3s ease-in-out;
    font-weight: 500;
    font-size: ${normalizeValue(1.2)};
    &:hover {
      background: ${isActive
        ? theme.colors.primary
        : theme.colors.secondaryBackgroundOpacity};
    }
    &:not(:last-child) {
      margin-right: ${normalizeValue(0.5)};
    }
  `}
`;

export const RecentContent = styled.div<{ isScrollable?: boolean }>`
  ${({ isScrollable }) => css`
    padding: ${normalizeValue(0.5)};
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
    border-radius: ${normalizeValue(5)};
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};

    transform: translate(-15%, -50%);

    transition: border-color 0.6s ease-in-out;
    &:hover {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const Card = styled.div<{ isRead?: boolean }>`
  ${({ theme, isRead }) => css`
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: ${normalizeValue(1)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(1)};
    transition: background 0.3s ease-in-out;
    opacity: ${isRead ? 1 : 0.5};
    cursor: pointer;
    &:hover {
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
    width: ${normalizeValue(3.6)};
    height: ${normalizeValue(3.6)};
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
    width: ${normalizeValue(1)};
    height: ${normalizeValue(1)};
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
    font-size: ${normalizeValue(1.2)};
    opacity: 0.6;
    line-height: 2;
  }
  strong {
    font-size: ${normalizeValue(1.4)};
    font-weight: 550;
  }
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${normalizeValue(1.5)};
    small {
      display: block;
      font-size: ${normalizeValue(1.2)};
      color: ${theme.colors.tertiaryText};
    }
    a {
      background: ${theme.colors.primary}33;
      color: ${theme.colors.primary};
      padding: 0.3rem ${normalizeValue(0.4)};
      border-radius: ${normalizeValue(0.5)};
      font-size: ${normalizeValue(1.2)};
      border: 1px solid transparent;
      transition:
        border-color 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
      &:hover {
        border-color: ${theme.colors.primary};
        background: transparent;
      }
    }
  `}
`;
