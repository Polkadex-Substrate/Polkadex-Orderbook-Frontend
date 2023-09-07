import styled, { css } from "styled-components";

export const Disclaimer = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 3rem;
    border-radius: 0.3rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    max-width: 45rem;
  `}
`;
export const Close = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    padding: 0.6rem;
    transition: background-color 0.2s ease-in;
    border-radius: 10rem;
    svg {
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const DisclaimerContainer = styled.div<{ isSmall?: boolean }>`
  ${({ theme, isSmall }) => css`
    display: grid;
    grid-template-columns: min-content auto;
    align-items: center;
    gap: 1rem;
    div {
      padding: ${isSmall ? "0.3rem" : "0.8rem"};
      width: ${isSmall ? "1.6rem" : "3rem"};
      height: ${isSmall ? "1.6rem" : "rem"};
      background: ${theme.colors.orange};
      border-radius: 20rem;
    }
  `}
`;

export const DisclaimerMessage = styled.p`
  ${({ theme }) => css`
    line-height: 1.4;
    strong {
      margin-right: 0.3rem;
    }
    a {
      margin-top: 0.4rem;
      display: block;
      color: ${theme.colors.white}99;
    }
  `}
`;
