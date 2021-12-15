import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: 1.6rem;
      font-weight: 550;
    }
    input {
      margin-left: 0.5rem;
      color: white;
      text-align: right;
    }
  `}
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: background 0.5s;
    background: ${isActive ? theme.colors.secondaryBackground : "initial"};
    margin-bottom: 1rem;

    ${!isActive &&
    css`
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    `}
    span {
      font-weight: 550;
      line-height: 1.6;
    }
    p {
      opacity: 0.7;
    }
  `}
`;

export const Aside = styled.div`
  text-align: right;
`;
