import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Main = styled.section`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    max-width: 35rem;
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    padding: 2rem;
  `}
`;

export const Container = styled.div``;
export const Actions = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 10rem;
    transition: border 0.3s ease-in-out;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    cursor: pointer;
    :hover {
      border-color: ${theme.colors.black};
    }
  `}
`;
export const Card = styled.div`
  ${({ theme }) => css`
    span {
      padding: 0.5rem;
      color: ${theme.colors.secondary};
      background: ${theme.colors.secondary}19;
      font-weight: 550;
      display: block;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      width: fit-content;
    }
    h3 {
      font-weight: 550;
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
    }
    p {
      opacity: 0.5;
      line-height: 1.5;
      margin-bottom: 2rem;
    }
    a {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      padding: 1rem;
      border-radius: 0.8rem;
      font-weight: 500;
      display: block;
      width: fit-content;
      transition: background 0.3s ease-in-out;
      border-width: 1px;
      border-style: solid;
      :hover {
        background: transparent;
        color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
      }
    }
  `}
`;
