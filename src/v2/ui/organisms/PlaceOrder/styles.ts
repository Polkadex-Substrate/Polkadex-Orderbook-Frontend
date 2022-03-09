import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: PlaceOrder;
    background: ${theme.colors.inverse};
    border-radius: 1rem;
  `}
`;

export const Header = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
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
  margin: 0 1rem;
`;

export const ListItem = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.text : "inherit"};
    color: ${isActive ? theme.colors.inverse : "inherit"};
    padding: 0.5rem;
    border-radius: 0.7rem;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
    font-weight: 500;
    :hover {
      background: ${isActive ? theme.colors.text : theme.colors.secondaryBackground};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
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
    transition: background 0.4s ease-in-out, opacity 0.4s ease-in-out;
    font-weight: 500;
    ${Icon} {
      display: inline-block;
      margin-right: 0.2rem;
      svg {
        fill: ${isActive ? theme.colors.white : theme.colors.text};
      }
    }
    :first-child {
      background: ${isActive ? theme.colors.green : "initial"};
    }
    :last-child {
      background: ${isActive ? theme.colors.primary : "initial"};
    }
    :hover {
      opacity: ${isActive ? 1 : 0.6};
    }
  `}
`;

export const Form = styled.div``;
export const Input = styled.div`
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    label {
      padding-left: 1rem;
      opacity: 0.6;
    }

    input {
      font-size: 1.4rem;
      width: 50%;
      color: ${theme.colors.text};
      padding: 1.5rem 0 1.5rem 1.5rem;
      background: inherit;
    }

    div {
      background: ${theme.colors.secondaryBackground};
      border-radius: 0.8rem;
      margin: 0 1rem 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding: 0.5rem;
        font-weight: 500;
        opacity: 0.6;
      }
    }
  `}
`;
export const InputContainer = styled.div``;
export const Available = styled.div`
  text-align: right;
  margin: 1.5rem 1rem;
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
  `}
`;

export const BoxInput = styled(Input)``;

export const Button = styled.button<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    color: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    font-weight: 500;
    width: 100%;
    :disabled {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
