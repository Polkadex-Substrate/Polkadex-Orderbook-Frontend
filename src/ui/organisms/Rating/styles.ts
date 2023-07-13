import styled, { css } from "styled-components";
export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
  `}
`;
export const Image = styled.div`
  width: 2rem;
  height: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
