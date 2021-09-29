import styled, { css } from "styled-components";

import { WrapperToken } from "src/ui/components/Icon/styles";
import { Wrapper as WrapperTag } from "src/ui/components/Tag/styles";
type Props = {
  marketActive: boolean;
};
export const Section = styled.section<Props>`
  ${({ theme, marketActive }) => css`
    margin-right: 1rem;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: ${marketActive ? "block" : "none"};
    margin-top: 1rem;
    border-radius: 1rem;
    min-width: 30rem;
    width: 100%;
    box-shadow: ${theme.shadow.tertiary};
    background: ${theme.colors.gradientBackground};
    & ${WrapperTag} {
      justify-self: flex-end;
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1rem;
  `}
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.3rem;
  & h3 {
    font-size: 1.5rem;
  }
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
    display: inline-block;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;

export const Content = styled.div`
  padding: 0.8rem;
`;
export const TableHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    margin-bottom: 1rem;
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

  & ${WrapperToken} {
    margin-right: 0.5rem;
  }
`;

export const ContentItemWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 2fr 1fr minmax(4rem, 6rem);
    align-items: center;
    border-radius: 1rem;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
    & p {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 600;
    }
    & ${ContentItemToken} span,
    ${ContentItemPrice} span {
      display: block;
      font-size: 1.1rem;
      opacity: 0.5;
      font-weight: 600;
    }
  `}
`;
