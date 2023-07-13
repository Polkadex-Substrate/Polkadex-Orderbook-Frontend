import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  overflow-x: auto;
`;

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
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;
export const Tbody = styled.tbody`
  font-size: 1.3rem;

  ${media.greaterThan("large")`
    height: 32rem;
    display: block;
    overflow-y: auto;
  `}
  tr {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    ${media.lessThan("large")`
      grid-template-columns: repeat(3,1fr);
      grid-row-gap: 2rem;
      grid-column-gap: 1rem;
    `}
  }
`;

export const Tr = styled.tr``;
export const Th = styled.th`
  font-weight: 500;
  :last-child {
    text-align: right;
  }
  ${media.lessThan("large")`
    display: none;
  `}
`;
export const EmptyWrapper = styled.div`
  padding: 10rem 0;
`;

export const Column = styled.div`
  ${({ theme }) => css`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.tertiaryText};
  `}
`;

export const Cell = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    small {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CellFlex = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

export const TokenIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 5rem;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.3rem;
    background: ${theme.colors.primaryBackground};
  `}
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const Link = styled.div`
  ${({ theme }) => css`
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
    font-size: 1.3rem;
    transition: background 0.4s ease-in-out;
    border: 1px solid ${theme.colors.secondaryBackground};
    cursor: pointer;
  `}
`;

export const WithdrawLink = styled(Link)``;
export const DepositLink = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.green};
    color: ${theme.colors.white};
    :hover {
      background-color: ${theme.colors.green}33;
    }
  `}
`;
