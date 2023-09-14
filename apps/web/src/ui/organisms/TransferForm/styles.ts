import styled, { css } from "styled-components";

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100rem;
  padding: 2rem;
  @media screen and (min-width: 1110px) {
    padding: 4rem;
  }
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

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

export const Wallets = styled.div`
  ${({ theme }) => css`
    display: flex;
    transition: flex-direction ease 0.2s;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.5rem;
    padding: 0.5rem;
    flex-direction: row;
    @media screen and (max-width: 880px) {
      flex-direction: column;
    }
  `}
`;

export const WalletsButton = styled.button<{ isDeposit: boolean }>`
  ${({ theme, isDeposit }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: transform ease 0.2s;
    background: ${isDeposit ? theme.colors.green : theme.colors.primary};
    transform: ${isDeposit ? "rotate(360deg)" : "rotate(0)"};
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
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.5rem;
    flex-direction: column;
    @media screen and (min-width: 640px) {
      flex-direction: row;
      align-items: center;
    }
  `}
`;

export const Errors = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      width: 1.3rem;
      height: 1.3rem;
      svg {
        fill: ${theme.colors.primary};
      }
    }
    background: ${theme.colors.white};
    border-radius: 0.5rem;
    padding: 0.8rem;
    p {
      color: ${theme.colors.inverse};
    }
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
    @media screen and (max-width: 640px) {
      border-top: 1px solid ${theme.colors.secondaryBackground};
    }
    @media screen and (min-width: 640px) {
      border-left: 1px solid ${theme.colors.secondaryBackground};
    }
    div {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.4rem;
      span {
        opacity: 0.5;
      }
      input {
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

export const Footer = styled.div<{ isDeposit?: boolean }>`
  ${({ theme, isDeposit }) => css`
    flex: 1;
    button {
      background: ${isDeposit ? theme.colors.green : theme.colors.primary};
      padding: 1.4rem;
      border-radius: 0.5rem;
      width: 100%;
      transition: background-color 0.5s ease;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryHover};
      }
    }
  `}
`;
