import styled, { css } from "styled-components";

import { LogoText } from "@orderbook/v3/ui/molecules/Logo/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    max-width: 5rem;
    border-radius: 0 2rem 2rem 2rem;
    padding: 1rem;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    justify-content: space-between;
    transition: max-width 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    overflow: hidden;
    li {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 1rem;
      cursor: pointer;
      :hover span {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      span {
        transition: background 0.2s ease-in-out;
        display: flex;
        place-items: center;
        border-radius: 1rem;
        min-width: 3rem;
        min-height: 3rem;
      }
      p {
        visibility: hidden;
      }
      svg {
        display: inline-block;
        max-width: 2rem;
        stroke: ${theme.colors.text};
        fill: ${theme.colors.text};
      }
    }
    :hover {
      max-width: 20rem;
      p {
        visibility: visible;
      }
      ${LogoText} {
        display: block;
        opacity: 1;
      }
    }
  `}
`;
export const Header = styled.div``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  li:last-child {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background: white;
    svg {
      fill: black;
    }
  }
`;
