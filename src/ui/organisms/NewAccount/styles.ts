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
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    :active {
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

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h2 {
      font-size: 1.8rem;
      font-weight: 550;
    }
    p {
      line-height: 1.4;
      color: ${theme.colors.tertiaryText};
    }
    strong {
      font-weight: 550;
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.4rem;
    opacity: ${isActive ? 1 : 0.3};
    cursor: pointer;
    user-select: none;
  `}
`;
export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    span {
      font-weight: 500;
    }
    p {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CardIcon = styled.div`
  ${({ theme }) => css`
    width: 3rem;
    height: 3rem;
    border-radius: 20rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.8rem;
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CardArrow = styled.div`
  ${({ theme }) => css`
    width: 1rem;
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;
