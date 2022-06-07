import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: 3rem 0;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  `}
`;

export const Container = styled.div`
  position: relative;
  padding: 2rem;
  max-width: 85rem;
  margin: 0 auto;
`;

export const Action = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    transition: background 0.2s ease-in-out;
    cursor: pointer;
    padding: 1.5rem;
    border-radius: 10rem;
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
