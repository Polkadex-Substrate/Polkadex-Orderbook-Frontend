import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    flex: 1;
  `}
`;
