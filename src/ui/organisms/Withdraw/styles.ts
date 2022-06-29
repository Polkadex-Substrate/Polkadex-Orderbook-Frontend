import styled, { css } from "styled-components";

import { SecondaryWrapper as FormInput } from "@polkadex/orderbook-ui/molecules/Input/styles";
import { Wrapper as DropdownWrapper } from "@polkadex/orderbook-ui/molecules/Dropdown/styles";

export const Wrapper = styled.div`
  display: flex;
  padding: 2rem;

  form {
    width: 100%;
  }
`;

export const QrCode = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-right: 1.5rem;
    p {
      margin-top: 1rem;
      font-weight: 500;
    }
    div {
      background: ${theme.colors.white};
      padding: 1rem;
      border-radius: 0.5rem;
      width: max-content;
    }
  `}
`;
export const Form = styled.div``;
export const IconWrapper = styled.div`
  @media screen and (max-width: 582px) {
    display: none;
  }
`;

export const FormWallet = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  @media screen and (min-width: 582px) {
    grid-template-columns: 1fr auto 1fr;
  }
`;

export const FormAddress = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1rem;
    ${FormInput} {
      margin-bottom: 1.2rem;
    }
    button {
      background: ${theme.colors.secondaryBackground};
      border-radius: 0.5rem;
      font-size: 1rem;
      padding: 0.6rem;
      margin-left: 0.5rem;
      transition: background 0.2s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const SelectPairWrapper = styled.div`
  flex: 1;
`;

export const SelectWrapper = styled.div`
  ${({ theme }) => css`
    padding: 1.5rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: block;
    }
  `}
`;
export const Select = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    box-shadow: ${theme.shadows.tertiary};
    max-height: 20rem;
    overflow-y: scroll;
    scrollbar-width: none;
  `}
`;
export const SelectContainer = styled(Select)<{ isOverflow?: boolean }>`
  ${({ theme, isOverflow = false }) => css`
    overflow: ${isOverflow ? "visible" : "hidden"};
  `}
`;
export const Error = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    margin-left: 1.3rem;
  `}
`;
export const SelectCard = styled.div`
  ${({ theme }) => css`
    padding: 0.4rem;
    cursor: pointer;
    border-radius: 0.4rem;
    color: black;
    transition: background 0.5s ease-in-out;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    :not(:last-child) {
      margin-bottom: 0.2rem;
    }
  `}
`;
export const FormAmount = styled.div`
  span {
    opacity: 0.6;
    font-weight: 500;
    white-space: nowrap;
    font-size: 1.2rem;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Container = styled.div`
  padding-left: 1.6rem;

  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 550;
    margin-bottom: 1rem;
  }
`;

export const Input = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    span {
      opacity: 0.7;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
    }
  `}
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  span {
    font-weight: 500;
    line-height: 2;
  }
  p {
    opacity: 0.7;
    font-size: 1.2rem;
  }
`;
