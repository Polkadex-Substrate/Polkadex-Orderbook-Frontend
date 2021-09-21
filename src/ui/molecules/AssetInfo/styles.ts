import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    :not(:last-child) {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid;
      border-bottom-color: ${theme.colors.secondaryBackground};
    }
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    span {
      display: block;
    }
    :first-child {
      p {
        font-size: ${theme.font.sizes.xsmall};
        margin-right: 0.5rem;
        font-weight: 600;
      }
    }
    :last-child {
      text-align: right;
      small {
        opacity: 0.7;
        font-size: ${theme.font.sizes.xsmall};
        margin-right: 0.6rem;
        font-weight: 500;
      }
      span {
        font-size: ${theme.font.sizes.xsmall};
      }
    }
  `}
`;
