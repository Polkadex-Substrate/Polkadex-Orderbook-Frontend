import styled from "styled-components";
import media from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

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
  font-size: ${normalizeValue(1.2)};
  color: #8ba1be;
  tr {
    margin-bottom: ${normalizeValue(1)};
    padding: 0${normalizeValue(1)};
  }
`;

export const Tbody = styled(Grid)`
  font-size: ${normalizeValue(1.3)};

  ${media.greaterThan("large")`
    height: ${normalizeValue(38)};
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
      grid-row-gap: ${normalizeValue(2)};
      grid-column-gap: ${normalizeValue(1)};
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
  padding: ${normalizeValue(10)} 0;
`;
