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
    grid-template-columns: 1fr 1fr 1.5fr repeat(4, 1fr);
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

export const ButtonWrapper = styled.div`
  ${({ theme }) => css`
  display: flex;
  gap: 1.3rem;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 10px;
    cursor: pointer;
    transition: none;
    background: ${theme.colors.secondaryBackground};
    color: ${theme.colors.text};
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
      font-size: 10px;
    }
    :hover {
      svg {
        fill: #fff;
        stroke: #fff;
      }
    }
  `}
`;
