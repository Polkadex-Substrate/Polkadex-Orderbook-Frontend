import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div``;

export const Header = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.inverse};
    background: ${isActive ? theme.colors.primary : theme.colors.text};
    padding: 1.8rem;
    border-radius: 1.5rem 0 0 1.5rem;
    transition: background 0.3s ease-in-out;
    color: ${isActive ? theme.colors.text : theme.colors.inverse};
    user-select: none;
    ${Icon} {
      margin-right: 0.5rem;
      svg {
        fill: ${isActive ? theme.colors.text : theme.colors.inverse};
      }
    }
  `}
`;

export const Content = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull = false }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    padding: 2.5rem 2rem;
    text-align: center;
    max-width: ${isFull ? "auto" : "26rem"};
    h4 {
      font-size: 1.4rem;
      font-weight: 550;
    }
    img {
      max-width: 20rem;
      width: 100%;
      margin: 1rem 0;
    }
    p {
      font-size: 1.2rem;
    }
  `}
`;
