import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    small {
      opacity: 0.5;
    }
    p {
      white-space: nowrap;
      font-size: 2rem;
      span {
        opacity: 0.5;
      }
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
    div {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.5rem;
      svg {
        stroke: ${theme.colors.tertiaryText};
      }
    }
    span {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
