import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { Wrapper as EmptyData } from "@orderbook/v2/ui/molecules/EmptyData/styles";

export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: Orderbook;
    background: ${theme.colors.inverse};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    max-height: -webkit-fill-available;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 0 2rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 550;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    ${EmptyData} {
      padding: 3rem 1rem;
    }
  }
`;

export const Table = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: relative;
    z-index: 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    ::-webkit-scrollbar-thumb {
      background: none;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
    :hover {
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    ${CardCell} {
      :first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const Head = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: -0.1px;
    z-index: 2;
    background: ${theme.colors.inverse};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 2rem;
    margin-bottom: 0.5rem;
    span {
      opacity: 0.5;
    }
  `}
`;

export const CellHead = styled.span`
  font-size: 1.2rem;

  :not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Body = styled.div``;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 1.6rem 0 2rem;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    :not(:last-child) {
      margin-bottom: 0.1rem;
    }
    :hover {
      background: ${isSell ? theme.colors.primary : theme.colors.green}19;
    }
  `}
`;

export const CardVolume = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: absolute;
    height: 100%;
    background: ${isSell ? theme.colors.primary : theme.colors.green}10;
  `}
`;

export const CardCell = styled.span`
  padding: 0.4rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

// Pricing
export const Pricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
`;

export const PricingAsideLeft = styled.div<{ isPriceUp?: boolean }>`
  ${({ theme, isPriceUp }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.5rem;
    border-radius: 0 1.2rem 1.2rem 0;
    flex: 1;
    span {
      font-size: 1.5rem;
      font-weight: 550;
      color: ${isPriceUp ? theme.colors.green : theme.colors.primary};
      ${Icon} {
        transition: transform 0.2s ease-in-out;
        margin-right: 0.5rem;
        svg {
          fill: ${isPriceUp ? theme.colors.green : theme.colors.primary};
        }
      }
    }
    p {
      display: inline-block;
      opacity: 0.4;
      font-size: 1.3rem;
      font-weight: 500;
      margin-left: 0.5rem;
    }
  `}
`;

export const PricingAsideRight = styled.div`
  ${({ theme }) => css`
    width: 4.2rem;
    height: 4.2rem;
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
