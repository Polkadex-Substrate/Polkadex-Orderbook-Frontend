import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div``;

// Table Styles
export const Table = styled.table`
  width: 100%;
  text-align: left;
`;
const Grid = styled.thead`
  tr {
    grid-template-columns: 1fr 1fr 1.5fr 1fr repeat(4, 1fr);
  }
`;

export const Thead = styled(Grid)`
  font-size: 1.2rem;
  color: #8ba1be;
  tr {
    display: grid;
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
    overflow: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    :hover {
      overflow-y: auto;
    }
  `}
  tr {
    display: grid;
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

export const EmptyWrapper = styled.div`
  padding: 10rem 0;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  padding-top: 5px;
`;

export const ErrorWrapper = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding-top: 8px;
    p {
      font-weight: 500;
      margin-bottom: 0.8rem;
      color: ${theme.colors.red};
    }
    button {
      background: rgba(139, 161, 190, 0.2);
      color: ${theme.colors.text};
    }
  `}
`;
