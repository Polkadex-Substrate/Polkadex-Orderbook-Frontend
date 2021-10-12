import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "src/ui/atoms/Icon/styles";
export const Wrapper = styled.div<{ isHeader?: boolean; isActive?: boolean }>`
  ${({ theme, isHeader, isActive }) => css`
    display: flex;
    align-items: center;
    background-color: ${isHeader ? theme.colors.secondaryBackgroundOpacity : "transparent"};
    border-radius: 1rem;
    padding: 0.6rem;
    flex: 1;
    ${isActive &&
    css`
      background: ${theme.colors.primaryBackgroundOpacity};
    `}
  `}
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  flex: 1;
  ${IconWrapper} {
    margin-left: 3rem;
  }
`;

export const AccountInfoHeader = styled.div`
  ${({ theme }) => css`
    flex: 1;
    p {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 600;
      display: inline-block;
      line-height: 1;
      text-transform: capitalize;
    }
    span {
      display: block;
      font-size: ${theme.font.sizes.xxsmall};
    }
  `}
`;

export const AccountInfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    word-break: break-all;
  }
`;

export const AccountContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground};
    border-radius: 1.4rem;
    width: 100%;
    box-shadow: ${theme.shadow.tertiary};
  `}
`;

export const AccountContentHeader = styled.div`
  margin-top: 1rem;
  padding: 1rem;
`;

export const AccountContentInfo = styled.div`
  ${IconWrapper} {
    display: inline-block;
    vertical-align: middle;
  }
  :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    a {
      margin-right: 4rem;
      opacity: 0.6;
      font-size: 1.1rem;
    }
    ${IconWrapper} {
      margin-left: 0.3rem;
    }
  }
  :last-child {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    p {
      opacity: 0.6;
      display: inline-block;
    }
    a {
      margin-left: 0.5rem;
      text-decoration: underline;
      cursor: pointer;
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
    font-size: 1.2rem;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const AccountContentFooter = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    text-align: center;
    margin-top: 0.7rem;
  `}
`;
