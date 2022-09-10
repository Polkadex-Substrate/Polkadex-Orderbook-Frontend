import styled, { css } from "styled-components";

import { SearchProps } from "./types";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    box-shadow: ${theme.shadows.primary};
    padding: 1rem;
    border-radius: 1.5rem;
    max-width: 40rem;
    width: max-content;
  `}
`;

export const ContentTokens = styled.div`
  margin-top: 1.5rem;
`;

export const ContentHeader = styled.div`
  margin-bottom: 1rem;
  & h5 {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;
export const ContentSearch = styled.div``;

export const SearchWrapper = styled.div<Partial<SearchProps>>`
  ${({ theme, fullWidth }) => css`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    max-width: ${fullWidth ? "initial" : "25rem"};
    & img {
      max-width: 1.5rem;
      opacity: 0.5;
    }
    & input {
      margin-left: 0.8rem;
      width: 100%;
      color: ${theme.colors.text};
    }
  `}
`;

export const TokenItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  & :hover {
    opacity: 0.7;
  }
  div {
    margin-left: 0.5rem;
    & span:first-child {
      font-size: 1.3rem;
      text-transform: uppercase;
      font-weight: 600;
      line-height: 1;
    }

    & span:last-child {
      font-size: 1.2rem;
      opacity: 0.5;
    }
  }
  & img {
    max-width: 3rem;
  }
  & span {
    display: block;
  }
`;
