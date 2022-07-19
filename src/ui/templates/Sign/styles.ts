import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Container = styled.div`
  min-width: 50rem;
  max-width: 80rem;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    margin: 0 2rem 1rem 2rem;
    div {
      max-width: 15rem;
      svg {
        width: 100%;
      }
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 0.6fr 1fr;
    border-radius: 2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 2rem;
    background-image: url("/img/signHero.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    div {
      padding: 3rem 2.5rem;
      max-width: calc(90%);
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 550;
      margin-bottom: 1.5rem;
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Box = styled.div`
  padding: 4rem;
  max-width: 40rem;
  justify-self: center;
  h1 {
    font-size: 1.8rem;
    font-weight: 550;
  }
  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Terms = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    a {
      color: ${theme.colors.primary};
    }
  `}
`;
