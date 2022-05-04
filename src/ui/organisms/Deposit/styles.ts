import styled, { css } from "styled-components";

import { SelectAccountWrapper as Dropdown } from "@polkadex/orderbook-ui/molecules/MyAccount/styles";

export const Wrapper = styled.div``;
export const WrapperContainer = styled.div`
  display: flex;
  padding: 2rem;
  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const SelectAccountContainer = styled.div`
  padding: 0 2rem;
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
export const QrCodeContainer = styled.div`
  text-align: center;
  margin-right: 1.5rem;
  width: fit-content;

  p {
    margin-top: 1rem;
  }
  @media screen and (max-width: 520px) {
    margin-bottom: 2rem;
  }
`;

export const QrCode = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    div {
      width: 140px;
      height: 140px;
      svg {
        width: 100%;
      }
    }
  `}
`;
export const Container = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  @media screen and (min-width: 460px) {
    padding-left: 1.6rem;
  }
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }
`;

export const Input = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    margin-bottom: 2rem;
    span {
      opacity: 0.7;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
    }
    button {
      margin-left: 1rem;
      background: ${theme.colors.secondaryBackground};
      padding: 0.5rem;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      transition: background 0.3s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
