import styled, { css } from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.div<{ hasLimit?: boolean; balances?: boolean }>`
  ${({ theme, hasLimit, balances }) => css`
    background: ${!hasLimit ? theme.colors.secondaryBackgroundSolid : "inherit"};
    border: 1px solid ${!hasLimit ? theme.colors.secondaryBackground : "none"};
    border-radius: 1.5rem;
    padding: 1rem 1rem ${balances ? "4rem" : "1rem"} 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    ${!hasLimit &&
    css`
      max-width: 25rem;
      ${EmptyHeader} {
        background: ${theme.colors.inverse};
      }
    `}
  `}
`;
export const EmptyHeader = styled.div`
  border-radius: 1.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  flex: 1;
  img {
    width: 100%;
    max-width: 25rem;
    max-height: 18rem;
  }
`;
export const EmptyContent = styled.div`
  ${({ theme }) => css`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 1.8rem;
      font-weight: 550;
    }
    p {
      margin: 1rem 0 3rem 0;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const EmptyActions = styled.div<{ hasLimit?: boolean }>`
  ${({ theme, hasLimit }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: ${hasLimit
      ? theme.colors.secondaryBackgroundOpacity
      : theme.colors.primaryBackgroundOpacity};
    border-radius: 1rem;
    position: relative;
    max-width: 25rem;

    :hover a {
      :nth-child(1) {
        :hover {
          color: ${theme.colors.white};
        }
        color: ${theme.colors.text};
      }
      :nth-child(2):hover {
        color: ${theme.colors.white};
        ~ div {
          left: 50%;
        }
      }
    }
    a {
      z-index: 1;
      padding: 1.5rem;
      white-space: nowrap;
      font-weight: 500;
      :nth-child(1) {
        color: ${theme.colors.white};
      }
      transition: color 0.5s ease-in-out;
    }

    div {
      position: absolute;
      width: 48%;
      height: 80%;
      background-color: ${theme.colors.primary};
      border-radius: 0.8rem;
      left: 2%;
      z-index: 0;
      transition: left 0.5s ease-in-out, right 0.5s ease-in-out;
    }
  `}
`;
