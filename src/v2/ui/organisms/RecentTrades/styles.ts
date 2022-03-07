import styled, { css } from "styled-components";

export const Main = styled.section<{ hasData?: boolean }>`
  ${({ theme, hasData }) => css`
    grid-area: RecentTrades;
    background: ${hasData ? theme.colors.inverse : theme.colors.secondaryBackgroundSolid};
    border-radius: 1rem;
    display: flex;
    flex-flow: column nowrap;
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 550;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding-bottom: 2rem;
    flex: 1;
    overflow: auto;
    ::-webkit-scrollbar-thumb {
      background: none;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
    :hover {
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const Head = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 2;
    background: ${theme.colors.secondaryBackgroundSolid};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 2rem;
    margin-bottom: 0.5rem;
    span {
      opacity: 0.5;
    }
  `}
`;

export const CellHead = styled.span`
  font-size: 1.2rem;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 1.6rem 0 2rem;
    font-weight: 500;
    :not(:last-child) {
      margin-bottom: 0.1rem;
    }
    ${CardCell} {
      :first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const CardCell = styled.span`
  padding: 0.4rem 0;
  font-size: 1.2rem;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  img {
    margin-bottom: 1rem;
    max-width: 22rem;
  }
`;
