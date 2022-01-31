import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: PlaceOrder;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0 1.5rem;
    h2 {
      font-size: 1.5rem;
      font-weight: 550;
    }
    ${List} {
      grid-gap: 0.5rem;
    }
  `}
`;

export const List = styled.div<{ isActive?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

export const ListItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.black : "inherit"};
    color: ${isActive ? theme.colors.white : "inherit"};
    padding: 0.5rem;
    border-radius: 0.7rem;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    font-weight: 500;
    :hover {
      background: ${isActive ? theme.colors.black : theme.colors.secondaryBackground};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    ${List} {
      margin-bottom: 1rem;
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 1rem;
    }
  `}
`;

export const ActionItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    color: ${isActive ? theme.colors.white : "inherit"};
    padding: 1.2rem;
    border-radius: 1rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    font-weight: 500;
    ${Icon} {
      display: inline-block;
      margin-right: 0.2rem;
      svg {
        fill: ${isActive ? theme.colors.white : theme.colors.black};
      }
    }
    :first-child {
      background: ${isActive ? theme.colors.green : "initial"};
    }
    :last-child {
      background: ${isActive ? theme.colors.primary : "initial"};
    }
  `}
`;

export const Form = styled.div``;
export const Input = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const FormInput = styled(Input)<{ isVertical?: boolean }>`
  ${({ theme, isVertical = false }) => css`
    flex-direction: ${isVertical ? "column" : "row"};
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const FormInputFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputLabel = styled.div`
  opacity: 0.5;
`;

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    input {
      font-size: 1.4rem;
      font-weight: 550;
      width: 100%;
      color: ${theme.colors.black};
      text-align: right;
      margin-right: 0.5rem;
    }
    span {
      opacity: 0.5;
    }
  `}
`;
export const InputContainer = styled.div``;
export const Available = styled.div`
  text-align: right;
  margin: 1.5rem 0;
  p {
    display: inline-block;
    opacity: 0.5;
    margin-right: 0.3rem;
    font-weight: 500;
  }
  span {
    font-weight: 500;
  }
`;

export const Box = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 1.5rem;
  `}
`;

export const BoxInput = styled(Input)``;

export const Button = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    font-weight: 500;
  `}
`;
