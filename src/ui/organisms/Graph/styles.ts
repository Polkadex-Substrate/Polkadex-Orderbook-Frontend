import styled, { css } from "styled-components";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 3rem 3rem 3rem;
    box-shadow: box-shadow: ${theme.shadows.smooth};
    display: grid;
    min-height: 30rem;
    width:100%;
    display:flex;
    align-self:baseline;
    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
    @media screen and (min-height: 1200px) {
     height: 50vh;
    }
  `}
`;
export const WrapperGraph = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  @media screen and (min-width: 1240px) {
    min-width: 58rem;
  }
  @media screen and (min-width: 1080px) and (max-width: 1240px) {
    min-width: 36rem;
  }
  @media screen and (min-width: 1688px)  {
    height: 50rem;
  }
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
 
  height: 38rem;
  @media screen and (min-width: 1688px)  {
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
    padding: 1rem;
    border-radius: 0.5rem;
  `}
`;
export const Ul = styled.ul<{ isColumn?: boolean }>`
  ${({ theme, isColumn }) => css`
    display: flex;
    flex-direction: ${isColumn ? "column" : "row"};
    gap: 0.8rem;
    align-items: ${isColumn ? "flex-start" : "center"};
    background: ${isColumn ? theme.colors.primaryBackground : "none"};
    border-radius: 1rem;
    padding: ${isColumn ? "1rem" : "0"};
  `}
`;

export const List = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    ${Icon} {
      cursor: pointer;
      transition: background 0.3s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      :active {
        background: ${theme.colors.primary};
      }
    }
  `}
`;
export const Li = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding: 0.2rem;
    border-radius: 0.5rem;
    background: ${isActive ? theme.colors.primary : "none"};
    color: ${isActive ? theme.colors.white : "inherit"};
    user-select: none;
    cursor: pointer; ;
  `}
`;

export const WrapperFilters = styled.div``;

// Graph
export const Graph = styled.div``;
export const FilterIcon = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
    svg {
      width: 1.5rem;
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
    gap: 1.5em;
    padding: 1rem;
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackground};
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    @media screen and (min-width: 450px) {
      min-width: 30rem;
    }
  `}
`;
export const MainIndicator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  strong {
    font-size: 1.5rem;
    font-weight: 550;
    display: block;
  }
`;
export const TimezoneContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  `}
`;

export const IconComponent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryBackgroundOpacity};
    border-radius: 20%;
    width: 2.3rem;
    height: 2.3rem;
    padding: 0.5rem;
    cursor: pointer;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
  `}
`;
