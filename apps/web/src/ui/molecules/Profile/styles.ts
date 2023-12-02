import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "../Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<{ isFull: boolean }>`
  ${({ theme, isFull = false }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.white};
    color: ${theme.colors.inverse};
    border-radius: ${normalizeValue(0.8)};
    padding: ${normalizeValue(0.4)};
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: ${normalizeValue(0.5)};
  flex: 1;

  span {
    line-height: 1.1;
  }
`;

export const AccountInfoHeader = styled.div`
  ${({ theme }) => css`
    margin-right: ${normalizeValue(1)};
    p,
    span {
      color: ${theme.colors.black};
    }
    p {
      font-weight: 600;
      display: inline-block;
      line-height: 1;
    }
    span {
      display: block;
      font-size: ${normalizeValue(1.3)};
    }
  `}
`;

export const SelectAccountFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectAccountTitle = styled.div`
  display: flex;
  align-items: center;
  ${IconWrapper} {
    margin-right: ${normalizeValue(0.2)};
  }
  p {
    max-width: ${normalizeValue(38)};
  }
`;
export const SelectAccountHeaderWrapper = styled.div`
  flex: 1;
`;

export const SelectAccountHeader = styled(AccountInfoHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: ${normalizeValue(38)};
  }
  span,
  p {
    color: black;
  }
`;

export const AccountContent = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull = false }) => css`
    background: ${theme.colors.white};
    clor: ${theme.colors.black};
    border-radius: ${normalizeValue(1)};
    box-shadow: ${theme.shadows.primary};
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const AccountContentHeader = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1)};
    margin: ${normalizeValue(1)} 0;
  `}
`;

export const AccountContentInfo = styled.div`
  &:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${normalizeValue(0.5)};
    span {
      display: block;
      opacity: 0.6;
      font-size: ${normalizeValue(1.2)};
      white-space: nowrap;
    }
    a {
      margin-left: ${normalizeValue(0.2)};
      display: inline-block;
      opacity: 1;
      transition: opacity 0.5s;
      &:hover {
        opacity: 0.6;
      }
    }
    ${IconWrapper} {
      margin-left: ${normalizeValue(0.5)};
    }
  }
  &:last-child {
    margin-top: ${normalizeValue(0.8)};
    font-size: ${normalizeValue(1.2)};
    p {
      opacity: 0.6;
      display: inline-block;
    }
    a {
      margin-left: ${normalizeValue(0.5)};
      text-decoration: underline;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.5s;
      &:hover {
        opacity: 0.6;
      }
    }
    ${IconWrapper} {
      margin-right: ${normalizeValue(0.5)};
    }
  }
`;

export const AccountContentSection = styled.div`
  padding: ${normalizeValue(1)};
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${normalizeValue(0.5)};
    opacity: 1;
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.6;
    }
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(1)};
    }
  }
`;

export const AccountInfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    word-break: break-all;
  }
`;

export const AvatarWrapper = styled.div``;

export const SelectAccountWrapper = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    min-width: ${normalizeValue(22)};
    background: ${theme.colors.white};
    border-radius: ${normalizeValue(1)};
    overflow: hidden;
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const SelectAccount = styled.div<{
  isActive?: boolean;
  isHeader?: boolean;
  isHoverable?: boolean;
}>`
  ${({ theme, isActive, isHeader, isHoverable }) => css`
    display: flex;
    align-items: center;
    padding: ${isHeader ? normalizeValue(0.6) : normalizeValue(0.6)};
    cursor: pointer;
    transition: background 0.5s;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(1)};
    &:hover {
      background: ${isHoverable
        ? theme.colors.secondaryBackgroundOpacity
        : "inherit"};
    }
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(0.5)};
    }
    ${isActive &&
    css`
      background: ${theme.colors.secondaryBackground};
    `}
  `}
`;

export const Content = styled.div<{ hasUser?: boolean }>`
  ${({ theme, hasUser }) => css`
    ${hasUser &&
    css`
      background: ${theme.colors.secondaryBackgroundSolid};
      min-width: ${normalizeValue(35)};
      border-radius: ${normalizeValue(1.5)};
      transition: height 400ms ease;
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    `}
    .menu-secondary-enter {
      transform: translateX(110%);
    }
    //Primary

    .menu-primary-enter {
      position: absolute;
      transform: translateX(-110%);
    }

    .menu-primary-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .menu-primary-exit {
      position: absolute;
    }

    .menu-primary-exit-active {
      transform: translateX(-110%);
      transition: transform 400ms ease;
    }

    //Secondary
    .menu-secondary-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .menu-secondary-exit-active {
      transform: translateX(110%);
      transition: transform 400ms ease;
    }
  `}
`;
