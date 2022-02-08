import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: Orderbook;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    max-height: -webkit-fill-available;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
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
  overflow: overlay;
`;

export const Table = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    overflow: overlay;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  opacity: 0.5;
  padding: 0 2rem;
  margin-bottom: 0.5rem;
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
      background: ${isSell ? theme.colors.green : theme.colors.primary}19;
    }
  `}
`;

export const CardVolume = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: absolute;
    height: 100%;
    background: ${isSell ? theme.colors.primary : theme.colors.green}13;
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

export const PricingAsideLeft = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.5rem;
    border-radius: 0 1.2rem 1.2rem 0;
    flex: 1;
    span {
      font-size: 1.5rem;
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
