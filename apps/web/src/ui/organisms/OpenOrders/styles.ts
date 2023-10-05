import styled from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div``;

// Table Styles
export const Table = styled.table`
  width: 100%;
  text-align: left;
`;
const Grid = styled.thead`
  tr {
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.6fr repeat(3, 1fr) 0.5fr;
  }
`;

export const Thead = styled(Grid)`
  font-size: 1.2rem;
  color: #8ba1be;
  tr {
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;

export const Tbody = styled(Grid)`
  font-size: 1.3rem;

  ${media.greaterThan("large")`
    height: 32rem;
    display: block;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &:hover {
      overflow-y: auto;
    }
  `}

  tr {
    align-items: center;
    /* ${media.lessThan("large")`
      grid-template-columns: repeat(4,1fr);
      grid-row-gap: 2rem;
      grid-column-gap: 1rem;
    `} */
  }
`;

export const Tr = styled.tr``;
export const Th = styled.th`
  font-weight: 500;
  ${media.lessThan("large")`
    display: none;
  `}
  &:last-child {
    text-align: right;
  }
`;

export const EmptyWrapper = styled.div`
  padding: 10rem 0;
`;

export const SkeletonWrapper = styled.div`
  div {
    margin-block: 1rem;
  }
`;
