import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: 200rem;
    /* border: 1px solid ${theme.colors.secondaryBackground}; */
    svg {
      fill: white;
    }
  `}
`;

export const Text = styled.text`
  font-size: 1.1rem;
  font-weight: 550;
`;
