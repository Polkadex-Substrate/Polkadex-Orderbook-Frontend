import styled, { css } from "styled-components";

export const Main = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    max-width: ${isFull ? "auto" : "35rem"};
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    min-width: 35rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
    padding: 2rem;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    span {
      color: ${theme.colors.inverse};
      display: block;
      font-size: 1.6rem;
      font-weight: 550;
      margin-left: 1rem;
    }
  `}
`;

export const Content = styled.div``;
