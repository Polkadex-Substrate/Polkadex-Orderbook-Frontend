import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;
    table {
      /* table-layout: fixed; */
      border-collapse: collapse;
      border-radius: 1rem;

      width: 100%;
      td {
        padding: 1.5rem 1rem 1.5rem 1rem;
        border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        &.last {
          border-bottom: none;
        }
      }

      tr:hover {
        td {
          transition: background-color ease 0.4s;
          background: ${theme.colors.secondaryBackgroundOpacity};
          &:first-child {
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
          }
          &:last-child {
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
          }
        }
      }

      th {
        opacity: 0.5;
        font-weight: normal;
        text-align: left;
        padding: 0 1rem 1.5rem 1rem;
        div {
          margin-left: 0.4rem;
          display: inline-block;
          width: 0.8rem;
        }
      }
    }
  `}
`;

export const Date = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    span {
      background: ${theme.colors.green}22;
      color: ${theme.colors.green};
      width: fit-content;
      padding: 0.1rem 0.2rem;
      border-radius: 0.2rem;
      font-size: 1.2rem;
    }
  `}
`;

export const Token = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    div {
      &:first-child {
        width: 3.5rem;
        height: 3.5rem;
        padding: 0.5rem;
        border-radius: 100rem;
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        span {
          opacity: 0.5;
        }
      }
    }
  `}
`;
