import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
const wrapperModifiers = {
  open: () => css`
    opacity: 1;
    pointer-events: auto;
  `,
  close: () => css`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  `,
};
export const Main = styled.div<{ isActive?: boolean }>`
  ${({ isActive }) => css`
    position: relative;
    cursor: pointer;
    ${Content},
    ${Overlay} {
      transition: opacity 0.2s ease-in;
      ${isActive && wrapperModifiers.open()}
      ${!isActive && wrapperModifiers.close()}
    }
    ${isActive &&
    css`
      ${Content} {
        height: auto;
        opacity: 1;
        padding: 6rem 1.5rem 1.5rem 1.5rem;
      }
      ${Search} {
        width: max-content;
        input {
          margin-left: 0.6rem;
        }
      }
      ${Actions} {
        display: block;
        opacity: 1;
        display: block;
      }
    `}
  `}
`;

export const Actions = styled.div`
  display: none;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

export const Header = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  align-items: center;
`;

export const Search = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.inverse};
    padding: 1rem;
    border-radius: 3rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    input {
      margin-left: 1.5rem;
    }
    ${Icon} {
      margin-left: 0.2rem;
      stroke: ${theme.colors.inverse};
    }
  `}
`;

export const Container = styled.div``;

export const Content = styled.div`
  ${({ theme }) => css`
    position: absolute;
    z-index: 1;
    top: -1rem;
    left: -1rem;
    color: ${theme.colors.black};
    height: 0;
    overflow: hidden;
    padding: 0 1.5rem;
    background: ${theme.colors.white};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.tertiary};
    min-width: 24rem;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  `}
`;

export const Results = styled.div``;
export const NoResults = styled.p`
  text-align: center;
  opacity: 0.6;
`;

export const ResultCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    transition: background 0.3s ease-in-out;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    :not(:last-child) {
      margin-bottom: 0.5rem;
    }
  `}
`;

export const ResultCardToken = styled.div`
  ${({ theme }) => css`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20rem;
    border: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const ResultCardContainer = styled.div`
  margin-left: 0.5rem;
  span {
    font-size: 1.3rem;
  }
  p {
    font-size: 1.2rem;
    opacity: 0.5;
  }
`;

export const RecentSearch = styled.div``;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    button {
      background: ${theme.colors.secondaryBackground};
      border-radius: 0.8rem;
      padding: 0.5rem 0.8rem;
      transition: background 0.3s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span ${Icon} {
    cursor: pointer;
    margin-right: 0.5rem;
  }
`;

export const CardActions = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
  :hover {
    opacity: 0.5;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.5s ease-in-out;
`;
