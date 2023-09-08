import styled, { css } from "styled-components";

export const Main = styled.section`
  ${({ theme }) => css`
    border-radius: 1.5rem 0 0 0;
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 2rem;
    min-width: 90vw;
    min-height: 99vh;
    height: 100%;
    padding: 3rem 2rem 2rem 2rem;
    @media screen and (min-width: 440px) {
      min-width: 50rem;
      max-width: 50rem;
    }
  `}
`;
export const Header = styled.button`
  ${({ theme }) => css`
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 10rem;
    cursor: pointer;
    transition: background-color 0.5s ease-in;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    &:active {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const Content = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: 550;
  }
`;
export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    width: 8rem;
    height: 8rem;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      transform: translateY(-0.2rem) scale(1.2);
    }
    svg g circle:first-child {
      fill: ${isActive ? theme.colors.primary : theme.colors.white};
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const Footer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const Button = styled.button`
  ${({ theme }) => css`
    padding: 1rem;
    width: 100%;
    border-radius: 0.3rem;
    font-weight: 500;
    &:first-child {
      background: ${theme.colors.secondaryBackground};
      flex: 1;
    }
    &:last-child {
      background: ${theme.colors.primary};
      &:disabled {
        background: gray;
      }
    }
  `}
`;
