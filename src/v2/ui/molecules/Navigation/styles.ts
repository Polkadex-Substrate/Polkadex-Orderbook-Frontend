import styled, { css } from "styled-components";

export const Main = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    max-width: ${isFull ? "auto" : "35rem"};
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: 35rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    padding: 2rem;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    span {
      display: block;
      font-size: 1.6rem;
      font-weight: 550;
      margin-left: 1rem;
    }
  `}
`;

export const Action = styled.div`
  ${({ theme }) => css`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 50%;
    transition: background 0.5s ease-in-out;
    cursor: pointer;
    :hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;

export const Content = styled.div``;
