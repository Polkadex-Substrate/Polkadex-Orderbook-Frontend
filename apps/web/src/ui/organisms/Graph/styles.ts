import styled, { css } from "styled-components";
import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<{ isLightMode: boolean }>`
  ${({ theme, isLightMode }) => css`
    background: ${theme.colors.primaryBackgroundSolid};
    border-radius: 0 ${normalizeValue(2)} ${normalizeValue(2)} ${normalizeValue(
      2
    )};
    box-shadow: box-shadow: ${theme.shadows.smooth};
    display: grid;
    min-height: ${normalizeValue(50)};
    width:100%;
    display:flex;
    align-self:baseline;
    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
    @media screen and (min-height: 1200px) {
      height: 50vh;
    }
    @media screen and (min-width: 1688px) {
      min-height: ${normalizeValue(50)};
    }
    ${
      isLightMode &&
      css`
        border: 2px solid ${theme.colors.secondaryBackground};
      `
    }
  `}
`;
export const WrapperGraph = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media screen and (min-width: 1240px) {
      min-width: ${normalizeValue(58)};
    }
    @media screen and (min-width: 1080px) and (max-width: 1240px) {
      min-width: ${normalizeValue(36)};
    }
    @media screen and (min-width: 1688px) {
      min-height: ${normalizeValue(50)};
    }
    @media screen and (min-width: 900px) {
      border-right: 1px solid ${theme.colors.secondaryBackground};
    }
  `}
`;

// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${normalizeValue(0.8)};
  flex-wrap: wrap;
  gap: ${normalizeValue(1.5)};
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  height: ${normalizeValue(38)};
  @media screen and (min-width: 1688px) {
    height: 100%;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(0.5)};
  `}
`;
export const Ul = styled.ul<{ isColumn?: boolean }>`
  ${({ theme, isColumn }) => css`
    display: flex;
    flex-direction: ${isColumn ? "column" : "row"};
    gap: ${normalizeValue(0.8)};
    align-items: ${isColumn ? "flex-start" : "center"};
    background: ${isColumn ? theme.colors.primaryBackground : "none"};
    border-radius: ${normalizeValue(1)};
    padding: ${isColumn ? normalizeValue(1) : "0"};
  `}
`;

export const List = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.8)};
    align-items: center;

    ${Icon} {
      cursor: pointer;
      transition: background 0.3s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:active {
        background: ${theme.colors.primary};
      }
    }
  `}
`;
export const Li = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding: ${normalizeValue(0.2)};
    border-radius: ${normalizeValue(0.5)};
    background: ${isActive ? theme.colors.primary : "none"};
    color: ${isActive ? theme.colors.white : "inherit"};
    user-select: none;
    cursor: pointer;
  `}
`;

export const WrapperFilters = styled.div``;

// Graph
export const Graph = styled.div``;
export const FilterIcon = styled.div<{ isActive?: boolean }>`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.5)};
    align-items: center;
    cursor: pointer;
    svg {
      width: ${normalizeValue(1.5)};
      stroke: ${theme.colors.text};
      fill: ${theme.colors.text};
      margin: 0;
    }
    span {
      white-space: nowrap;
    }
  `}
`;
export const Indicator = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
    padding: ${normalizeValue(1)};
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackground};
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    @media screen and (min-width: 450px) {
      min-width: ${normalizeValue(38)};
    }
  `}
`;
export const MainIndicator = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.1)};
  strong {
    font-size: ${normalizeValue(1.5)};
    font-weight: 550;
    display: block;
  }
`;
export const TimezoneContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    background: ${theme.colors.tertiaryBackground};
    border: 1px solid ${theme.colors.secondaryBackground};
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
  `}
`;
export const Button = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background: ${isActive ? theme.colors.primary : "none"};
    padding: ${normalizeValue(0.5)}${normalizeValue(1)};
    border-radius: ${normalizeValue(0.5)};
  `}
`;

export const IconComponent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryBackgroundOpacity};
    border-radius: 20%;
    width: ${normalizeValue(2.3)};
    height: ${normalizeValue(2.3)};
    padding: ${normalizeValue(0.5)};
    cursor: pointer;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
  `}
`;
