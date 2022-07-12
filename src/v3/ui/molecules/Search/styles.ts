import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: ${isFull ? "100%" : "3rem"};
    height: 3rem;
    border-radius: 20rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    transition: width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1), border 0.2s ease-in-out;
    cursor: pointer;
    :hover {
      width: 100%;
      border-color: ${theme.colors.text};
    }
    button {
      padding: 0 0.7rem;
      height: 100%;
    }
    input {
      color: ${theme.colors.text};
      margin-left: 0.3rem;
      width: 100%;
    }
  `}
`;
