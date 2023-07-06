import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const QuestionWrapper = styled.div`
  padding: 3rem;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Question = styled.div`
  ${({ theme }) => css`
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
    font-size: ${theme.font.sizes.small};
    cursor: pointer;
    svg {
      fill: white;
      &:hover {
        fill: red;
      }
    }
  `}
`;
