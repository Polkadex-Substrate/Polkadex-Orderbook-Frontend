import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem;
    border-radius: 0.5rem;
    background: ${theme.colors.inverse};
    input {
      color: ${theme.colors.text};
      width: 100%;
      padding-right: 0.5rem;
    }
    button {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      border-radius: 0.5rem;
      padding: 0.3rem;
      font-size: 1.2rem;
    }
  `}
`;
