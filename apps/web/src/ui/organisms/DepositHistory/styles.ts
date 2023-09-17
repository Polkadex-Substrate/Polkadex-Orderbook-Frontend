import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Table = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    width: 100%;
    max-height: 40rem;
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    table {
      table-layout: auto;
      padding: 1rem 1rem;
      width: 100%;
      @media screen and (min-width: 1110px) {
        padding: 1rem 3rem;
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
          display: block;
          opacity: 0.5;
          text-transform: lowercase;
          &::first-letter {
            text-transform: uppercase;
          }
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
    gap: 1rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    flex-direction: column;
    @media screen and (min-width: 550px) {
      flex-direction: row;
      align-items: center;
    }
    h3 {
      font-size: 1.8rem;
      font-weight: 550;
    }
    @media screen and (min-width: 1110px) {
      padding: 1rem 4rem;
    }
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 50;
`;

export const SkeletonComponent = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 2rem;
`;
