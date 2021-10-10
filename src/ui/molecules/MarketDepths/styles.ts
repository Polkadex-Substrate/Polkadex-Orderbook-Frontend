import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  `}
`;