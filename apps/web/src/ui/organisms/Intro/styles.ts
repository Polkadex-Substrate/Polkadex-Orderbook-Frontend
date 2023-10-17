import styled, { css } from "styled-components";

export const Intro = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.primaryBackgroundSolid};
    padding: 2rem;
    border-radius: 1rem;
  `}
`;

export const IntroActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const IntroButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      transition: background-color 0.5s ease;
      padding: 1rem;
      border-radius: 0.4rem;
      &:last-child {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const IntroSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
