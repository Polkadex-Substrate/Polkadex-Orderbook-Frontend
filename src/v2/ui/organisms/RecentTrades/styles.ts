import styled, { css } from "styled-components";

export const Main = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    max-width: 35rem;
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.7rem;
    font-weight: 550;
  }
`;

export const Content = styled.div`
  padding-bottom: 2rem;
`;

export const Table = styled.div``;

export const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  opacity: 0.5;
  padding: 0 2rem;
  margin-bottom: 0.5rem;
`;

export const CellHead = styled.span`
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Body = styled.div``;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 1.6rem 0 2rem;
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
  :not(:first-child) {
    justify-self: flex-end;
  }
`;
