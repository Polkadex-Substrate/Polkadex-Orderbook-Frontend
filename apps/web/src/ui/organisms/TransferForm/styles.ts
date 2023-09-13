import styled, { css } from "styled-components";

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100rem;
  padding: 4rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: flex-end;

  span {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

export const Wallets = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.5rem;
    padding: 0.5rem;
  `}
`;

export const WalletsButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: ${theme.colors.primary};
    padding: 0.8rem;
    border-radius: 0.4rem;
    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
    span {
      font-size: 1.1rem;
      font-weight: 500;
    }
  `}
`;

export const Form = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.5rem;
  `}
`;

export const Token = styled.div``;

export const Amount = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    border-left: 1px solid ${theme.colors.secondaryBackground};
    div {
      display: flex;
      flex-direction: column;
      flex: 1;
      span {
        opacity: 0.5;
      }
      input {
        padding: 0.5rem;
        width: 100%;
        font-size: 1.6rem;
        font-weight: 550;
        color: ${theme.colors.text};
      }
    }
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.5s ease;
      font-size: 1.1rem;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryBackground};
      }
      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    flex: 1;
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: 1.4rem;
      border-radius: 0.5rem;
      width: 100%;
      transition: background-color 0.5s ease;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryBackground};
      }
      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
  `}
`;
