import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  background: #2e303c;
  border-radius: 0 3rem 3rem 3rem;
  box-shadow: 0px 30px 45px rgba(0, 0, 0, 0.17);
  display: grid;
  @media screen and (min-width: 980px) {
    grid-template-columns: 1fr auto;
  }
`;
export const WrapperGraph = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  box-shadow: 0px 30px 45px rgba(0, 0, 0, 0.17);
`;
// Header
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: 0.8rem;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;
export const Li = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding: 0.4rem;
    border-radius: 0.5rem;
    background: ${isActive ? theme.colors.primary : "none"};
    cursor: pointer; ;
  `}
`;

export const WrapperFilters = styled.div``;

// Graph
export const Graph = styled.div``;
export const FilterIcon = styled.div`
  ${({ theme }) => css`
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
