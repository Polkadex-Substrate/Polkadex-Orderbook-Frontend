import styled, { css } from "styled-components";

import { Primary as Input } from "@polkadex/orderbook-ui/molecules/Input/styles";
import { SelectAccountWrapper as Dropdown } from "@polkadex/orderbook-ui/molecules/MyAccount/styles";

export const Main = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    @media screen and (min-width: 660px) {
      background-image: url("/img/loginBgLight.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 120%;
    }
  `}
`;

export const Wrapper = styled.section`
  max-width: 90rem;
  margin: 0 auto;
`;

export const Container = styled.div`
  padding-top: 8rem;
  display: grid;
  grid-gap: 2rem;
  @media screen and (max-width: 920px) {
    padding: 8rem 2rem 0 2rem;
  }
  @media screen and (min-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const AsideRight = styled.div`
  position: relative;
  ${({ theme }) => css`
    div {
      padding-left: 6rem;
      h2 {
        font-size: 2.2rem;
      }
      strong {
        display: block;
        color: ${theme.colors.primary};
      }
    }
    figure {
      img {
        border-radius: 2rem;
        position: absolute;
        top: 25%;
        max-height: 85vh;
      }
    }
    @media screen and (max-width: 920px) {
      display: none;
    }
  `}
`;

export const AsideLeft = styled.div``;
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
    margin: 1rem 0;
  }
`;

export const SelectContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    box-shadow: ${theme.shadows.tertiary};
    max-height: 20rem;
    overflow-y: scroll;
    scrollbar-width: none;
    ${Dropdown} {
      cursor: pointer;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
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
