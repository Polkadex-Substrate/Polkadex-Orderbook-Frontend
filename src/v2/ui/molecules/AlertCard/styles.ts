import styled, { css } from "styled-components";

export const Main = styled.div<{ isFull?: boolean }>`
  ${({ isFull }) => css`
    position: relative;
    max-width: ${isFull ? "auto" : "34rem"};
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.secondary};
    padding: 0.5rem;
  `}
`;

export const Action = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  padding: 1rem;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 0.4;
  }
`;

export const Aside = styled.div`
  ${({ theme }) => css`
    :first-child {
      background: ${theme.colors.primary};
      padding: 2rem 0.5rem;
      border-radius: 1rem;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
    }
    :last-child {
      align-self: center;
      span {
        font-weight: 550;
        font-size: 1.3rem;
      }
      p {
        margin-top: 0.3rem;
        font-size: 1.2rem;
      }
    }
  `}
`;
