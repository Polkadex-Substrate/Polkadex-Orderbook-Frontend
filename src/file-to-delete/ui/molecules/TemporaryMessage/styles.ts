import styled, { css } from "styled-components";

export const Main = styled.div`
  ${({ theme }) => css`
    background: white;
    color: black;
    padding: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    button {
      padding: 1rem;
      border-radius: 10rem;
      transition: background 0.2s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    svg {
      width: 0.8rem;
      fill: black;
    }
  `}
`;
