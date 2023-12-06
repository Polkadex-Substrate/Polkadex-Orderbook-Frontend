import styled, { css } from "styled-components";
import { Wrapper as EmptyData } from "@polkadex/orderbook-ui/molecules/EmptyData/styles";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-height: ${normalizeValue(50)};
    @media screen and (min-width: 900px) {
      /* border-left: 1px solid ${theme.colors.secondaryBackground}; */
      max-width: ${normalizeValue(35)};
      width: 30%;
      min-width: ${normalizeValue(30)};
    }

    @media screen and (min-width: 1688px) {
      /* border-left: 1px solid ${theme.colors.secondaryBackground}; */
      max-width: 4 ${normalizeValue(1.8)};
    }
    @media screen and (min-height: 1200px) {
      min-height: 50vh;
    }
  `}
`;

export const WrapperTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${normalizeValue(1)} ${normalizeValue(1)} ${normalizeValue(1)}
    ${normalizeValue(1)};
`;

export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(0.5)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
  `}
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${normalizeValue(0.5)};
  margin-right: ${normalizeValue(1)};
`;
export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const SizeHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  font-size: ${normalizeValue(1.3)};
  div {
    width: ${normalizeValue(0.8)};
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Main = styled.section`
  ${({ theme }) => css`
    grid-area: Orderbook;
    background: ${theme.colors.inverse};
    border-radius: ${normalizeValue(1)};
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
  padding: ${normalizeValue(1)} ${normalizeValue(1)} 0 ${normalizeValue(1)};
  margin-bottom: ${normalizeValue(1)};
  h2 {
    font-size: ${normalizeValue(1.5)};
    font-weight: 600;
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
      padding: ${normalizeValue(3)} ${normalizeValue(1)};
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
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    ${CardCell} {
      &:first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const Head = styled.div<{ lightMode?: boolean }>`
  ${({ theme, lightMode }) => css`
    position: sticky;
    top: -0.1px;
    z-index: 2;
    background: ${lightMode
      ? theme.colors.primaryBackgroundSolid
      : theme.colors.inverse};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 ${normalizeValue(1)};
    margin-bottom: ${normalizeValue(0.5)};
    span {
      opacity: 0.5;
    }
  `}
`;

export const CellHead = styled.span`
  font-size: ${normalizeValue(1.2)};

  &:not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Body = styled.div<{ isSell?: boolean }>`
  ${({ isSell }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: ${isSell ? "flex-end" : "flex-start"};
  `}
`;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 ${normalizeValue(1)};
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    &:not(:last-child) {
      margin-bottom: ${normalizeValue(0.1)};
    }
    &:hover {
      background: ${isSell ? theme.colors.primary : theme.colors.green}19;
    }
  `}
`;

export const CardVolume = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: absolute;
    height: 100%;
    background: ${isSell ? theme.colors.primary : theme.colors.green}10;
    z-index: -1;
  `}
`;

export const CardCell = styled.span`
  padding: ${normalizeValue(0.4)} 0;
  font-size: ${normalizeValue(1.2)};
  font-weight: 500;
  &:not(:first-child) {
    justify-self: flex-end;
  }
`;

// Pricing
export const Pricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${normalizeValue(0.8)} 0;
`;

export const PricingAsideLeft = styled.div<{ isPriceUp?: boolean }>`
  ${({ theme, isPriceUp }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1)};
    flex: 1;
    span {
      font-size: ${normalizeValue(1.5)};
      font-weight: 600;
      color: ${isPriceUp ? theme.colors.green : theme.colors.primary};

      ${Icon} {
        transition: transform 0.2s ease-in-out;
        margin-right: ${normalizeValue(0.5)};
        transform: ${isPriceUp ? "rotate(180deg)" : "rotate(0)"};
        svg {
          fill: ${isPriceUp ? theme.colors.green : theme.colors.primary};
        }
      }
    }
    p {
      display: inline-block;
      opacity: 0.4;
      font-size: ${normalizeValue(1.3)};
      font-weight: 500;
      margin-left: ${normalizeValue(0.5)};
    }
  `}
`;

export const PricingAsideRight = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    border: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${normalizeValue(20)};
    margin: 0 ${normalizeValue(2)};
    cursor: pointer;
    transition: border 0.5s ease-in-out;
    &:hover {
      border: 1px solid ${theme.colors.black};
    }
  `}
`;
export const Skeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
  padding: ${normalizeValue(0.5)}${normalizeValue(1)};
`;
