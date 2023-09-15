import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    small {
      font-size: 1.2rem;
      opacity: 0.5;
    }
    p {
      white-space: nowrap;
      font-size: 1.9rem;
      font-weight: 500;
      span {
        opacity: 0.5;
      }
    }
  `}
`;
export const Icon = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.5rem;
    width: 2.3rem;
    height: 2.3rem;
    padding: 0.5rem;
    svg {
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
    span {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Message = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  div {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
