import styled, { css } from "styled-components";

import { LogoText, Link as LogoWrapper } from "../../molecules/Logo/styles";

import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

export const Container = styled.div`
  min-height: 100vh;
`;

export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0 1rem;
  flex: 1;
  @media screen and (max-width: 590px) {
    margin-bottom: 8rem;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;
export const WrapperGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
`;

export const WrapperRight = styled.div`
  ${({ theme }) => css`
    float: 1;
    display: flex;
    gap: 1rem;
    min-width: 29rem;

    @media screen and (min-width: 1080px), (max-width: 780px) {
      flex-direction: column;
    }
    @media screen and (min-width: 1080px) {
      max-width: 29rem;
    }
  `}
`;
export const Actions = styled.div`
  padding-top: 1rem;
  max-width: 15rem;
  justify-self: flex-end;
  align-self: flex-end;
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;
export const Box = styled.div`
  ${({ theme }) => css`
    justify-content: space-between;
    align-items: center;
    /* Setting the padding for the Box component. */
    /* padding: 0.4rem 1rem; */
    display: none;
    padding: 0 1rem;
    ${Button} {
      transition: background 0.5s ease-in-out;
      background: ${theme.colors.primary};
      :hover {
        background: ${theme.colors.primary}D8;
      }
    }
    ${Logo} {
      margin: 1rem 0;
    }
    @media screen and (max-width: 590px) {
      display: flex;
      position: sticky;
      top: 0;
      right: 0;
      width: 100%;
      z-index: 32;
      background: ${theme.colors.primaryBackground};
      box-shadow: ${theme.shadows.tertiary};
    }
  `}
`;
export const Logo = styled.div`
  ${() => css`
    visibility: hidden;
    @media screen and (max-width: 590px) {
      visibility: visible;
      ${LogoText} {
        display: block;
        opacity: 1;
      }
    }
  `}
`;
