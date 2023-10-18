import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    max-height: 54vh;
    table {
      border-spacing: 0 0.5rem;
      border-collapse: separate;
      width: 100%;
      padding: 1rem 1rem;
      @media screen and (min-width: 1110px) {
        padding: 1rem 3rem;
      }
      td {
        padding: 1rem;
      }
      tr {
        &.active td {
          border-top: 1px solid ${theme.colors.primary};
          border-bottom: 1px solid ${theme.colors.primary};
          &:last-child {
            border-right: 1px solid ${theme.colors.primary};
          }
          &:first-child {
            border-left: 1px solid ${theme.colors.primary};
          }
        }
        &:not(:last-child) td {
          border-bottom: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
        }
        td {
          cursor: pointer;
        }
      }
      tr:hover {
        td {
          transition: background-color ease 0.4s;
          background: ${theme.colors.tertiaryBackgroundOpacity};
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

export const Thead = styled.th<{ isActionTab?: boolean }>`
  ${({ theme, isActionTab }) => css`
    white-space: nowrap;
    cursor: ${isActionTab ? "default" : "pointer"};
    user-select: none;
    text-align: right;
    svg {
      fill: ${theme.colors.text};
      path {
        opacity: 0.5;
      }
    }
    &.desc svg path:first-child {
      opacity: 1;
    }
    &.asc svg path:last-child {
      opacity: 1;
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
    text-align: left;
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
        text-align: left;
        flex-direction: column;
        gap: 0.1rem;
        span {
          font-weight:;
        }
        p {
          opacity: 0.5;
          &::first-letter {
            text-transform: uppercase;
          }
          text-transform: lowercase;
        }
      }
    }
  `}
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    a {
      padding: 0.5rem 0.8rem;
      border-radius: 0.2rem;
      transition: background-color 0.5s ease;
      white-space: nowrap;
      font-weight: 500;
      font-size: 1.3rem;
      &:nth-child(1),
      &:nth-child(2) {
        border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
        &:hover:not(:disabled) {
          background: ${theme.colors.secondaryBackground};
        }
      }
      &:nth-child(3) {
        color: ${theme.colors.white};
        background: ${theme.colors.primary};
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryHover};
        }
      }

      &:disabled {
        background: gray;
        cursor: not-allowed;
      }

      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
  `}
`;
export const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
`;

export const TooltipMessage = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    color: ${theme.colors.inverse};
  `}
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  span {
    font-weight: 500;
  }
  p {
    opacity: 0.5;
  }
`;

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
`;
