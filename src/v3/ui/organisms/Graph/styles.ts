import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  background: #2e303c;
  border-radius: 0 3rem 3rem 3rem;
  box-shadow: 0px 30px 45px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${media.lessThan("large")`
    flex-direction: column;
  `}
`;
export const WrapperGraph = styled.section`
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
  grid-column-gap: 1rem;
  align-items: center;
`;
export const WrapperFilters = styled.div``;

// Graph
export const Graph = styled.div``;
