import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    border-radius: 1.5rem;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    box-shadow: ${theme.shadows.tertiary};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    h2 {
      font-size: ${theme.font.sizes.medium};
      font-weight: 500;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    border-radius: 1.5rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Card = styled.div`
  :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const CardTitle = styled.span`
  display: block;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
