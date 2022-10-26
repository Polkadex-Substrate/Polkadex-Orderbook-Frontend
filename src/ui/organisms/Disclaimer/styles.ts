import styled, { css } from "styled-components";

export const Disclaimer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    max-width: 45rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 1rem;
    div {
      padding: 0.8rem;
      width: 3rem;
      height: 3rem;
      background: ${theme.colors.orange};
      border-radius: 20rem;
    }
  `}
`;
export const DisclaimerMessage = styled.p`
  strong {
    margin-right: 0.3rem;
  }
`;
