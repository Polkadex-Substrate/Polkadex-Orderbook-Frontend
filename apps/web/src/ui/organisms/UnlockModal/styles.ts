import styled, { css } from "styled-components";

export const UnlockAccount = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    position: relative;
  `}
`;

export const UnlockButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    border-radius: 10rem;
    transition: background-color 0.3s ease-in-out;
    svg {
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
