import styled, { css } from "styled-components";

export const Wrapper = styled.div`
`;

export const Form = styled.form``;

export const FormContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    :first-child {
      margin-bottom: 1rem;
    }

    :last-child {
      margin-top: 1rem;
    }

    a {
      font-size: ${theme.font.sizes.xsmall};
      opacity: 0.5;
      transition: opacity 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  `}
`;
