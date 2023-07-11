import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    height: fit-content;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;
export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    max-width: 160rem;
    margin: 0 auto;
    img {
      width: 3rem;
    }
    p {
      color: ${theme.colors.tertiaryText};
      line-height: 1.3;
      strong {
        color: ${theme.colors.text};
        font-size: ${theme.font.sizes.small};
        font-weight: normal;
      }
    }
  `}
`;
