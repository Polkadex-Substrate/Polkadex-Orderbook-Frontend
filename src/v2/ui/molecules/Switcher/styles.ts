import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 1.5rem;
    align-items: center;
    color: ${theme.colors.inverse};
    :not(:last-child) {
      margin-bottom: 2rem;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 550;
  }
  p {
    margin-top: 0.5rem;
    line-height: 1.3;
    opacity: 0.4;
  }
  ${Icon} {
    margin-right: 1rem;
  }
`;

export const Switch = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.secondaryBackground : theme.colors.primary};
    padding: 0.2rem;
    border-radius: 10rem;
    min-width: 3.5rem;
    height: 2rem;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    div {
      position: absolute;
      bottom: 50%;
      transform: translate(0, 50%);
      ${isActive
        ? css`
            left: 0;
          `
        : css`
            right: 0;
          `}

      margin: 0 0.3rem;
      background: ${theme.colors.white};
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 10rem;
    }
  `}
`;
