import styled, { css } from "styled-components";

import { SelectAccountWrapper as Dropdown } from "@polkadex/orderbook-ui/molecules/MyAccount/styles";
import { Wrapper as DropdownWrapper } from "@polkadex/orderbook-ui/molecules/Dropdown/styles";
import { Box as InputPrimary } from "@polkadex/orderbook-ui/molecules/Input/styles";

export const Wrapper = styled.div``;
export const WrapperContainer = styled.div`
  display: flex;
  padding: 0 2rem;
  margin-top: 1rem;
  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SelectAccountContainer = styled.div`
  padding: 0 2rem;
`;

export const SelectPairContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    padding: 0 2rem;
    margin-top: 1rem;
    ${DropdownWrapper} {
      flex: 1;
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

export const SelectContent = styled(Select)<{ isOverflow?: boolean }>`
  ${({ theme, isOverflow = false }) => css`
    overflow: scroll;
    ${Dropdown} {
      cursor: pointer;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  `}
`;

export const SelectContainer = styled(Select)<{ isOverflow?: boolean }>`
  ${({ theme, isOverflow = false }) => css`
    overflow: ${isOverflow ? "visible" : "hidden"};
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

export const SelectMessage = styled.p`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.black};
    padding: 1rem 0;
  `}
`;

export const Container = styled.div`
  flex: 1;
`;

export const Input = styled.div`
  ${({ theme }) => css`
    margin-bottom: 2rem;
    ${InputPrimary} {
      background: ${theme.colors.secondaryBackgroundOpacity};
      label {
        opacity: 0.7;
      }
      label,
      input {
        color: ${theme.colors.text};
      }
    }
  `}
`;
export const Actions = styled.div`
  padding: 0 2rem;
  margin-top: 1rem;
`;

export const Error = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    margin-left: 1.3rem;
  `}
`;
