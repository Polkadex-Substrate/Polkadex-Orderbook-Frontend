import styled, { css } from "styled-components";

import { Wrapper as WrapperTag } from "@polkadex/orderbook/file-to-delete/ui/organisms/Tag/styles";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Section = styled.section<{ marketActive?: boolean }>`
  ${({ theme, marketActive }) => css`
    margin-right: 1rem;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: ${marketActive ? "block" : "none"};
    margin-top: 1rem;
    border-radius: 1rem;
    min-width: 30rem;
    width: 100%;
    box-shadow: ${theme.shadows.tertiary};
    background: ${theme.colors.primaryBackground};
    & ${WrapperTag} {
      justify-self: flex-end;
    }
  `}
`;

export const Header = styled.div``;
export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    & h3 {
      font-size: 1.5rem;
    }
    input {
      color: ${theme.colors.text};
    }
  `}
`;

export const Pairs = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & ul {
      list-style: none;
    }
  `}
`;

export const PairListItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.primary : theme.colors.primaryBackground};
    color: ${isActive ? theme.colors.white : theme.colors.text};
    display: inline-block;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease-in-out;
    ${!isActive &&
    css`
      :hover {
        background: ${theme.colors.secondaryBackground};
      }
    `}

    :not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;

export const Content = styled.div``;

export const TableHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    padding: 1rem 1.5rem 0.5rem 1.5rem;

    & span {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 500;
      opacity: 0.5;
      &:last-child {
        text-align: right;
      }
    }
  `}
`;

export const TableContent = styled.div``;

export const ContentItemPrice = styled.div``;

export const ContentItemToken = styled.div`
  display: flex;
  align-items: center;

  & ${Icon} {
    margin-right: 0.5rem;
  }
`;
export const TokenWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  svg {
    fill: initial;
  }
`;
export const ContentItemWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    transition: background 0.2s ease-in-out;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }

    p {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 600;
    }

    ${ContentItemToken} span,
    ${ContentItemPrice} span {
      display: block;
      font-size: 1.1rem;
      opacity: 0.5;
      font-weight: 600;
    }
  `}
`;
