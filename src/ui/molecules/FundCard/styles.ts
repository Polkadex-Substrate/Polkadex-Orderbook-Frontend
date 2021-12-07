import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Token = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.7;
  }
  & ${Icon} {
    margin-right: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 0.5rem;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
    }

    & p {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 600;
    }
    &  span,
      display: block;
      font-size: 1.1rem;
      font-weight: 600;

  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    span {
      opacity: 0.7;
    }
  `}
`;
export const Actions = styled.div`
  ${({ theme }) => css`
    button {
      :first-child {
        background: ${theme.colors.secondaryBackground};
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin-right: 1rem;
        font-size: ${theme.font.sizes.xxsmall};
      }
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexJustify = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const Box = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackgroundOpacity};
    box-shadow: ${theme.shadows.tertiary};
    border-radius: 0.5rem;
    margin: 0 0.5rem 1.5rem 0.5rem;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    display: center;
    padding: 1.5rem;

    p {
      font-size: 1.3rem;
      font-weight: 600;
    }
    span {
      display: block;
      padding: 0.1rem 0.2rem;
      width: fit-content;
      border-radius: 0.4rem;
      text-transform: capitalize;
      font-weight: 500;
      margin-top: 0.4rem;
    }
    button {
      opacity: 0.7;
    }
  `}
`;

export const Footer = styled.div`
  padding: 1.5rem;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 1.5rem;
    p,
    span {
      font-size: ${theme.font.sizes.xxxsmall};
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
    p,
    span {
      font-size: ${theme.font.sizes.xxxsmall};
    }
    span {
      opacity: 0.7;
    }
    p {
      font-weight: 500;
    }
  `}
`;
