import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div``;

export const Header = styled.div<{
  isActive?: boolean;
  background?: string;
  hasBorder?: boolean;
}>`
  ${({ theme, isActive, background, hasBorder }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.inverse};
    background: ${isActive ? theme.colors.primary : theme.colors[background]};
    padding: 1.4rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: ${hasBorder ? "1rem" : "0"};
    border-bottom-right-radius: ${hasBorder ? "1rem" : "0"};
    border-bottom-left-radius: 1rem;
    transition: background 0.3s ease-in-out, opacity 0.3s ease-in-out;
    color: ${theme.colors.text};
    user-select: none;
    ${Icon} {
      margin-right: 0.5rem;
    }
    :hover {
      opacity: 0.7;
    }
  `}
`;

export const Content = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull = false }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    padding: 2.5rem 2rem;
    text-align: center;
    max-width: ${isFull ? "inherit" : "26rem"};
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
