import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css, DefaultTheme } from "styled-components";

import { InformationItemProps, SearchProps } from "./types";

// Pair Component
export const TokenWrapper = styled.a`
  cursor: pointer;
`;

export const PairItemWrapper = styled.div``;


// Header Currency
export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 1.5rem;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderBox = styled.div`
  ${({ theme }) => css`
    margin-left: 0.5rem;
    span {
      display: block;
      :first-child {
        font-size: ${theme.font.sizes.medium};
        font-weight: 600;
        line-height: 1;
      }
      :last-child {
        font-size: ${theme.font.sizes.xsmall};
        opacity: 0.6;
      }
    }
  `}
`;

export const HeaderLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.7;
`;

// Content Currency
export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: ${theme.shadow.primary};
    border-radius: ${theme.border.radius.primary.medium};
    padding: 1rem;
    width: 100%;
    max-height: 35rem;
  `}
`;

export const ContentSearch = styled.div``
export const ContentTokens = styled.div`
  margin-top: 1rem;
  overflow-y: auto;
  height: -webkit-fill-available;
`

export const ContentContainer = styled.div`
  margin-top: 1.5rem;
`;

export const ContentHeader = styled.div`
  margin-bottom: 1rem;
  h5 {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
export const ContentSearchWrapper = styled.div``;

export const SearchWrapper = styled.div<Partial<SearchProps>>`
  ${({ theme, fullWidth }) => css`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    flex: 1;
    img {
      max-width: 1.5rem;
      opacity: 0.5;
    }
    input {
      margin-left: 0.8rem;
      width: 100%;
    }
  `}
`;

export const TokenItemWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: ${theme.transition.default};
    background: ${theme.colors.primaryBackground};
    border-radius: 1rem;
    padding: 0.8rem;
    :not(:last-child) {
      margin-bottom: 0.8rem;
    }

    :hover {
      opacity: 0.8;
    }
  `}
`;

export const TokenItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  flex: 1;
`
export const TokenItemBox = styled.div`
  :last-child {
    & span {
        text-align: end;
    }
  }
  & span {
    display: block;
    
    :first-child {
      font-size: 1.3rem;
      font-weight: 600;
      line-height: 1;
    }

    :last-child {
      font-size: 1.2rem;
      opacity: 0.5;
    }
  }
`
