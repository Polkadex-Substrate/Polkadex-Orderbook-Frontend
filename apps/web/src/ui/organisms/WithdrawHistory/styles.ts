import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;
    width: 100%;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    table {
      /* table-layout: fixed; */
      padding: 1rem 3rem;
      empty-cells: 10px;
      width: 100%;
      thead {
        border-top: 1px solid black;
      }

      td {
        padding: 1.5rem 1rem 1.5rem 1rem;
        border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        &.last {
          border-bottom: none;
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

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  span {
    opacity: 0.5;
  }
`;

export const Wallet = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      &:first-child {
        background: ${theme.colors.secondaryBackgroundOpacity};
        border-radius: 50rem;
        width: 3rem;
        height: 3rem;
        padding: 0.8rem;
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

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 1rem 4rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    h3 {
      font-size: 1.8rem;
      font-weight: 550;
    }
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
