import styled, { css } from "styled-components";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 3rem 3rem 3rem;
    box-shadow: box-shadow: ${theme.shadows.smooth};
    display: grid;
    min-height: 30rem;
    @media screen and (min-width: 980px) {
      grid-template-columns: 1fr auto;
    }
  `}
`;
export const WrapperGraph = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
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

export const List = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
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
    padding: 0.5rem 1rem;
    background: ${isActive ? theme.colors.primary : "none"};
    svg {
      width: 1.5rem;
      stroke: ${isActive ? theme.colors.white : theme.colors.text};
      fill: ${isActive ? theme.colors.white : theme.colors.text};
      margin: 0;
    }
    span {
      white-space: nowrap;
      color: ${isActive ? theme.colors.white : theme.colors.text};
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
export const Button = styled.button<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    text-align: left;
    white-space: nowrap;
    background: ${isActive ? theme.colors.primary : "none"};
    padding: 0.5rem 1rem;
  `}
`;
