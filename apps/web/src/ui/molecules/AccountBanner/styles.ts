import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  min-height: 28rem;
  max-width: 60rem;
  display: flex;
  position: relative;
`;
export const Close = styled.button`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 2.5rem;
    right: 2.5rem;
    width: 3rem;
    padding: 1rem;
    border-radius: 5rem;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
export const Container = styled.div`
  ${({ theme }) => css`
    height: 100%;
    flex: 1;
    display: grid;
    align-items: center;
    background: ${theme.colors.primaryBackground};
    border-radius: 1.2rem;
    @media screen and (min-width: 620px) {
      grid-template-columns: 1.2fr 1fr;
    }
  `}
`;

export const Column = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  justify-content: center;
  img {
    width: 100%;
    max-width: 40rem;
    margin-left: -2rem;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem;
    @media screen and (min-width: 500px) {
      padding: 3rem;
    }
    div {
      &:first-child {
        h2 {
          font-weight: 550;
          margin-bottom: 1rem;
        }
        p: last-child {
          margin-top: 1rem;
        }
      }
      &:last-child {
        display: flex;
        justify-content: flex-end;
        gap: 2rem;
        margin-top: 2rem;
        a {
          border-radius: 1rem;
          padding: 1.2rem;
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          transition:
            background-color 0.3s ease-in-out,
            color 0.3s ease-in-out;
          &:hover {
            background: ${theme.colors.primary}33;
            color: ${theme.colors.primary};
          }
        }
        button {
          color: ${theme.colors.tertiaryText};
          transition: color 0.3s ease-in-out;
          &:hover {
            color: ${theme.colors.text};
          }
        }
      }
    }
  `}
`;
