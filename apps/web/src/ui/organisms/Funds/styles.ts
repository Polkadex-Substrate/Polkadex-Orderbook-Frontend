import styled, { css } from "styled-components";
import media from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  overflow-x: auto;
`;

// Table Styles
export const Table = styled.table`
  width: 100%;
  text-align: left;
`;
export const Thead = styled.thead`
  font-size: ${normalizeValue(1.2)};
  color: #8ba1be;
  tr {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: ${normalizeValue(1)};
    padding: 0 ${normalizeValue(1)};
  }
`;
export const Tbody = styled.tbody`
  font-size: ${normalizeValue(1.3)};

  ${media.greaterThan("large")`
    height: ${normalizeValue(32)};
    display: block;
    overflow-y: auto;
  `}
  tr {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    ${media.lessThan("large")`
      grid-template-columns: repeat(3,1fr);
      grid-row-gap: ${normalizeValue(2)};
      grid-column-gap: ${normalizeValue(1)};
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
  padding: ${normalizeValue(10)} 0;
`;

export const Column = styled.div`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.2)};
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
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CellFlex = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${normalizeValue(1)};
`;

export const TokenIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(5)};
    width: ${normalizeValue(2.5)};
    height: ${normalizeValue(2.5)};
    margin-right: ${normalizeValue(0.3)};
    background: ${theme.colors.primaryBackground};
  `}
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;
export const Link = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(0.2)} ${normalizeValue(0.4)};
    font-size: ${normalizeValue(1.3)};
    transition: background 0.4s ease-in-out;
    border: 1px solid ${theme.colors.secondaryBackground};
    cursor: pointer;
    padding: ${normalizeValue(0.5)} ${normalizeValue(0.8)};
  `}
`;

export const WithdrawLink = styled(Link)``;
export const DepositLink = styled(Link)``;

export const TransferLink = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.primary}88;
    }
  `}
`;

export const Icon = styled.div`
  width: ${normalizeValue(1.5)};
  height: ${normalizeValue(1.5)};
  display: inline-block;
  vertical-align: middle;
  margin-right: ${normalizeValue(0.5)};
`;

export const TooltipMessage = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    color: ${theme.colors.inverse};
  `}
`;

export const SkeletonWrapper = styled.div`
  div {
    margin-block: ${normalizeValue(1)};
  }
`;
