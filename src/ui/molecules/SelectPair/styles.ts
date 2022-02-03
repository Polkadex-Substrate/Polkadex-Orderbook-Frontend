import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: ${theme.font.sizes.xsmall};
    span {
      margin: 0 0.5rem;
    }
  `}
`;
export const TokenWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  svg {
    fill: initial;
  }
`;
