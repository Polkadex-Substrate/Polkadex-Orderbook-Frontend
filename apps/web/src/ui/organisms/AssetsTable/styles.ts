import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;
    overflow: auto;
    table {
      border-spacing: 0 0.5rem;
      border-collapse: separate;
      width: 100%;
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
        &:nth-child(even) td {
          background: ${theme.colors.tertiaryBackgroundOpacity};
        }
        td {
          text-align: right;
          cursor: pointer;

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
      tr:hover {
        td {
          transition: background-color ease 0.4s;
          background: ${theme.colors.secondaryBackground};
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
        &:not(:first-child) {
          text-align: right;
        }
      }
    }
  `}
`;

export const Thead = styled.th`
  ${({ theme }) => css`
    white-space: nowrap;
    cursor: pointer;
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
