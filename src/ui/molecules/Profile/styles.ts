import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "../Icon/styles";

export const Wrapper = styled.div<{ isFull: boolean }>`
  ${({ theme, isFull = false }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.white};
    color: ${theme.colors.inverse};
    border-radius: 0.8rem;
    padding: 0.4rem;
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
  margin-left: 0.5rem;
  flex: 1;

  span {
    line-height: 1.1;
  }
`;

export const AccountInfoHeader = styled.div`
  ${({ theme }) => css`
    margin-right: 1rem;
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
      font-size: 1.3rem;
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
    margin-right: 0.2rem;
  }
  p {
    max-width: 30rem;
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
    max-width: 30rem;
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
    border-radius: 1rem;
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
    padding: 1rem;
    margin: 1rem 0;
  `}
`;

export const AccountContentInfo = styled.div`
  :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    span {
      display: block;
      opacity: 0.6;
      font-size: 1.2rem;
      white-space: nowrap;
    }
    a {
      margin-left: 0.2rem;
      display: inline-block;
      opacity: 1;
      transition: opacity 0.5s;
      :hover {
        opacity: 0.6;
      }
    }
    ${IconWrapper} {
      margin-left: 0.5rem;
    }
  }
  :last-child {
    margin-top: 0.8rem;
    font-size: 1.2rem;
    p {
      opacity: 0.6;
      display: inline-block;
    }
    a {
      margin-left: 0.5rem;
      text-decoration: underline;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.5s;
      :hover {
        opacity: 0.6;
      }
    }
    ${IconWrapper} {
      margin-right: 0.5rem;
    }
  }
`;

export const AccountContentSection = styled.div`
  padding: 1rem;
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    opacity: 1;
    transition: opacity 0.5s;
    :hover {
      opacity: 0.6;
    }
    :not(:last-child) {
      margin-bottom: 1rem;
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
    min-width: 22rem;
    background: ${theme.colors.white};
    border-radius: 1rem;
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
    padding: ${isHeader ? "0.8rem" : "0.6rem"};
    cursor: pointer;
    transition: background 0.5s;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    :hover {
      background: ${isHoverable ? theme.colors.secondaryBackgroundOpacity : "inherit"};
    }
    :not(:last-child) {
      margin-bottom: 0.5rem;
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
      min-width: 35rem;
      border-radius: 1.5rem;
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
