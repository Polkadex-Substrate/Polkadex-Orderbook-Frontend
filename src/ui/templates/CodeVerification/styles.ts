import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;
export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow-y: scroll;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: 3rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 880px) {
    min-width: 80rem;
    max-width: 80rem;
  }
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
    grid-template-columns: auto 1fr;
    border-radius: 2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: 2rem;
    @media screen and (min-width: 880px) {
      min-height: 40rem;
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 2rem;
    width: 3rem;
  `}
`;

export const Box = styled.div`
  padding: 2rem;
  width: 100%;
  @media screen and (min-width: 880px) {
    max-width: 40rem;
    padding: 4rem;
    justify-self: center;
    align-self: center;
  }
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
export const ResendButton = styled.button`
  ${({ theme }) => css`
    font-size: 1.2rem;
    padding: 0.6rem;
    border-radius: 0.5rem;
    margin-top: 0.8rem;
    background: ${theme.colors.primary}22;
    color: ${theme.colors.primary};
    white-space: nowrap;
    :disabled {
      background: ${theme.colors.secondaryBackground};
      color: ${theme.colors.text};
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;
