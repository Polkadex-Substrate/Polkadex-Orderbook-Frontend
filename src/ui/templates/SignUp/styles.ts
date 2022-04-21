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
  margin-bottom: 3rem;
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
  ${() => css`
    width: 100%;
    ${Form} {
      h3 {
        font-size: 1.5rem;
        font-weight: 550;
      }
    }
  `}
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
  margin: 2rem 0;

  ${Input} {
    margin-top: 1rem;
  }
  ${Dropdown} {
    margin-bottom: 1rem;
  }
`;
export const Connect = styled.div`
  margin-bottom: 1rem;
`;

export const ConnectTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  `}
`;

export const ConnectTitleWrapper = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const ConnetTitleIcon = styled.a`
  width: 2rem;
`;

export const ConnectContent = styled.div`
  ${({ theme }) => css`
    margin-top: 1.5rem;
    text-align: center;
    padding: 3rem 2rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;
export const ConnectEmpty = styled.div`
  p {
    margin-bottom: 1rem;
  }
`;
export const ConnectBox = styled.div`
  h4 {
    font-size: 1.5rem;
  }
  p {
    margin: 0.5rem 0 1rem 0;
  }
`;

export const Login = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    background: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    a {
      color: ${theme.colors.black} !important;
      background: ${theme.colors.secondaryBackground};
      transition: background 0.2s ease-in-out;
      border-radius: 1rem;
      padding: 1rem;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
export const LoginWrapper = styled.div`
  ${({ theme }) => css`
    p,
    h3 {
      color: ${theme.colors.black};
    }
    p {
      margin-top: 0.5rem;
    }
  `}
`;

export const FormTitle = styled.div`
  margin-bottom: 1.2rem;
  p {
    margin-top: 0.5rem;
  }
`;

export const FormTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SuccessWrapper = styled.div`
  ${({ theme }) => css`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.green};
    svg {
      max-width: 1rem;
    }
  `}
`;

export const SelectContent = styled.div<{ isOverflow: boolean }>`
  ${({ theme, isOverflow = false }) => css`
    background-color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 1rem;
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

export const SelectMessage = styled.p`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.black};
    padding: 1rem 0;
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

export const Footer = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  `}
`;
