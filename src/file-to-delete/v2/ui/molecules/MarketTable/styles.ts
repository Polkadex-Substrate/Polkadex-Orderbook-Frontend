import styled from "styled-components";

export const Wrapper = styled.div``;

// Table Styles
export const Table = styled.table`
  width: 100%;
  text-align: left;
`;
export const Thead = styled.thead`
  font-size: 1.1rem;
  color: #8ba1be;
  tr {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    margin-bottom: 1rem;
  }
`;
export const Tbody = styled.tbody`
  color: white;
  font-size: 1.3rem;
  tr {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: center;
  }
`;

export const Tr = styled.tr``;
export const Th = styled.th``;
