import styled from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div``;

// Table Styles
export const Table = styled.table`
  width: 100%;
  text-align: left;
`;
export const Thead = styled.thead`
  font-size: 1.2rem;
  color: #8ba1be;
  tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr) 0.5fr;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;
export const Tbody = styled.tbody`
  color: white;
  font-size: 1.3rem;

  ${media.greaterThan("large")`
    height: 32rem;
    display: block;
    overflow-y: auto;
  `}
  tr {
    display: grid;
    grid-template-columns: 2.5fr repeat(5, 1fr) 0.5fr;
    align-items: center;
    ${media.lessThan("large")`
      grid-template-columns: repeat(4,1fr);
      grid-row-gap: 2rem;
      grid-column-gap: 1rem;
    `}
  }
`;

export const Tr = styled.tr``;
export const Th = styled.th`
  font-weight: 500;
  ${media.lessThan("large")`
    display: none;
  `}
`;
