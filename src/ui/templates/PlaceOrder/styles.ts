import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: PlaceOrder;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.8rem;
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
  `}
`;

export const TabHeader = styled.div<{ isActive?: boolean; isSell?: boolean }>`
  ${({ theme, isSell, isActive }) => css`
    background: ${isActive
      ? isSell
        ? theme.colors.primary
        : theme.colors.green
      : "transparent"};
    padding: 0.8rem;
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: 600;
    text-align: center;
    color: ${isActive ? theme.colors.white : theme.colors.text};
  `}
`;

export const Content = styled.div`
  margin-top: 1rem;
`;

export const Footer = styled.div`
  margin-top: 2.5rem;
`;

export const FooterTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 500;
      opacity: 0.6;
      ${Icon} {
        display: inline-block;
        margin-left: 0.3rem;
        vertical-align: middle;
      }
    }
  `}
`;

export const FooterActions = styled.div`
  ${({ theme }) => css`
    margin: 1rem 0 1.5rem 0;
    button {
      width: 100%;
      background: ${theme.colors.primaryBackground};
      border-bottom: 2px solid;
      padding: 1.2rem;
      border-radius: 0.2rem;
      font-weight: 600;
      border-bottom-color: ${theme.colors.primary};
    }
  `}
`;
