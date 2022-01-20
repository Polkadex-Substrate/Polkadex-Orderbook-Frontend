import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isFull: boolean }>`
  ${({ theme, isFull = false }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.primaryBackground};
    padding: 0.9rem;
    border-radius: 1.5rem 0 0 1.5rem;
    cursor: pointer;
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  flex: 1;
  span {
    line-height: 1.1;
  }
`;

export const AccountInfoHeader = styled.div`
  ${({ theme }) => css`
    margin-right: 1rem;
    p,
    span {
      color: ${theme.colors.text};
    }
    p {
      font-weight: 600;
      display: inline-block;
      line-height: 1;
    }
    span {
      display: block;
      font-size: 1.3rem;
    }
  `}
`;
