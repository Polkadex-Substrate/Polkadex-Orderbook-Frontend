import styled, { css } from "styled-components";

import { Primary as Input } from "@polkadex/orderbook-ui/molecules/Input/styles";
import { SelectAccountWrapper as Dropdown } from "@polkadex/orderbook-ui/molecules/MyAccount/styles";

export const Main = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `}
`;

export const Wrapper = styled.section`
  display: grid;
  grid-gap: 5rem;
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  @media screen and (max-width: 920px) {
    padding: 0 2rem;
  }
  @media screen and (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Content = styled.div`
  max-width: 42.5rem;
`;

export const Container = styled.div`
  padding-top: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex: 1;
`;

export const AsideRight = styled.div``;

export const AsideLeft = styled.div`
  width: 100%;
`;
export const Title = styled.div`
  ${({ theme }) => css`
    h1 {
      font-size: 3.5rem;
    }
    p {
      font-size: 1.5rem;
    }
    a {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  `}
`;

export const Form = styled.div`
  padding: 5rem 0;
  ${Input} {
    margin-top: 1rem;
  }
  ${Dropdown} {
    margin-bottom: 1rem;
  }
`;

export const SelectContent = styled.div<{ isOverflow: boolean }>`
  ${({ theme, isOverflow = false }) => css`
    background-color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    box-shadow: ${theme.shadows.tertiary};
    max-height: 20rem;
    overflow-y: ${isOverflow ? "overlay" : "hidden"};
    scrollbar-width: none;
    ${Dropdown} {
      cursor: pointer;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  `}
`;

export const SelectMessage = styled.p`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.black};
    padding: 1rem 0;
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  `}
`;

export const Box = styled.div`
  padding: 2rem;
  @media screen and (min-width: 920px) {
    padding: 4rem;
  }
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    border-radius: 2rem;
    height: 100%;
    padding-top: 8rem;
  `}
`;

export const CardContent = styled.div`
  ${({ theme }) => css`
    padding: 3rem;
    h4 {
      font-size: 1.6rem;
      margin: 1rem 0 2rem 0;
    }
    p {
      line-height: 1.5;
    }
    p,
    h4 {
      color: ${theme.colors.inverse};
    }

    strong {
      margin-top: 2rem;
    }
    strong {
      display: block;
    }
    @media screen and (min-width: 920px) {
      padding: 4rem;
    }
  `}
`;
