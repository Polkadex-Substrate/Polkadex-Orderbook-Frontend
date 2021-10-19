import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ centered?: boolean }>`
  ${({ theme, centered }) => css`
    text-align: center;
    padding: 2rem 0;
    display: flex;
    height: 100%;
    align-items: ${centered ? "center" : "flex-start"};
    justify-content: ${centered ? "center" : "flex-start"};
    svg {
      min-width: 20rem;
      width: 100%;
    }
  `}
`;
export const Container = styled.div`
  div {
    max-width: 20rem;
    margin: 0 auto;
  }
  p {
    margin-top: 1.7rem;
    opacity: 0.7;
  }
`;
