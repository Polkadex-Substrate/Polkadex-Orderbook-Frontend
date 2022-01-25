import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Main = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    max-width: 35rem;
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.7rem;
    font-weight: 550;
  }
`;

export const Content = styled.div`
  padding-bottom: 2rem;
`;

export const Table = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    ${CardCell} {
      :first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  opacity: 0.5;
  padding: 0 2rem;
  margin-bottom: 0.5rem;
`;

export const CellHead = styled.span`
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Body = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  max-height: 14.5rem;
`;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 0 1.6rem 0 2rem;
  :not(:last-child) {
    margin-bottom: 0.1rem;
  }
`;

export const CardVolume = styled.div<{ isSell?: boolean; volume: number }>`
  ${({ theme, isSell, volume }) => css`
    position: absolute;
    width: ${volume}%;
    height: 100%;
    background: ${isSell ? theme.colors.primary : theme.colors.green}13;
  `}
`;

export const CardCell = styled.span`
  padding: 0.4rem 0;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

// Pricing
export const Pricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const PricingAsideLeft = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 2rem;
    border-radius: 0 1.2rem 1.2rem 0;
    flex: 1;
    span {
      font-size: 1.7rem;
      font-weight: 550;
      color: ${isSell ? theme.colors.primary : theme.colors.green};
      ${Icon} {
        transition: transform 0.2s ease-in-out;

        margin-right: 0.5rem;
        svg {
          fill: ${isSell ? theme.colors.primary : theme.colors.green};
        }
      }
    }
    p {
      display: inline-block;
      opacity: 0.4;
      font-size: 1.4rem;
      font-weight: 500;
      margin-left: 0.5rem;
    }
  `}
`;

export const PricingAsideRight = styled.div`
  ${({ theme }) => css`
    width: 5rem;
    height: 5rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20rem;
    margin: 0 2rem;
    cursor: pointer;
    transition: border 0.5s ease-in-out;
    :hover {
      border: 1px solid ${theme.colors.black};
    }
  `}
`;
