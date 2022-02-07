import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { Container as Message } from "@polkadex/orderbook-ui/molecules/AvailableMessage/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Orderbook;
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  ${Message} {
    z-index: 33;
  }
  h2 {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
    `}
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  ul {
    list-style: none;
    margin-right: 0.5rem;
    li {
      display: inline-block;
      cursor: pointer;

      :not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content 1fr;
  height: auto;
`;
export const Box = styled.div``;

export const BoxHeader = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 0.3rem;
    padding: 0 1rem;

    span {
      font-size: ${theme.font.sizes.xxxsmall};
      font-weight: 500;
      opacity: 0.5;

      :not(:first-child) {
        text-align: end;
      }
    }
  `}
`;

export const BoxContent = styled.div<{ hasScroll?: boolean }>`
  ${({ theme, hasScroll }) => css`
    height: 15rem;
    overflow-x: hidden;
    overflow-y: ${hasScroll ? "scroll" : "hidden"};
    scrollbar-width: none;
    position: relative;
    font-weight: 500;

    span {
      font-size: ${theme.font.sizes.xxxsmall};
    }
  `}
`;

export const OrderbookCardContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${Icon} {
    margin: 0 0.5rem;
  }
`;

export const OrderbookPrice = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    span {
      :first-child {
        opacity: 0.7;
      }
      :last-child {
        opacity: 1;
        font-weight: 600;
      }
      color: ${isSell ? theme.colors.green : theme.colors.primary};
    }
  `}
`;

export const OrderbookCardWrapper = styled.div`
  width: 100%;
  text-align: end;
  span {
    display: inline-block;
  }
`;

export const OrderbookAmount = styled(OrderbookCardWrapper)``;

export const OrderbookCard = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    cursor: pointer;
    padding: 0.1rem 1rem;
    transition: ${theme.transition.default};

    :hover ${VolumeSpan} {
      opacity: 0.5;
    }

    :not(:last-child) {
      margin-bottom: 0.2rem;
    }
  `}
`;

export const Select = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    padding: 1rem;
    text-align: center;
    margin: 0.8rem 0;
    font-weight: 600;
  `}
`;

export const LastPriceWrapper = styled.p`
  margin: 0;
`;

export const LastPrice = styled.strong<{ isPositive?: boolean }>`
  ${({ theme, isPositive }) => css`
    color: ${isPositive ? theme.colors.green : theme.colors.primary};
    margin-left: 0.3rem;
  `}
`;

export const VolumeSpan = styled.span<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: absolute;
    height: 100%;
    opacity: 0.2;
    background: ${isSell ? theme.colors.gradientGreen : theme.colors.gradientRed};
  `}
`;

export const OrderbookDropdown = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    box-shadow: : ${theme.shadows.primary};
    padding: 1rem;
    border-radius: 1rem;
    text-align: left;
    width: max-content;
    button {
      font-weight: bold;

      :first-child {
        margin-bottom: 1rem;
        display: block;
      }
    }
  `}
`;
