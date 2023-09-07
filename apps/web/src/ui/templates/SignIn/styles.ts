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

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    border-radius: 2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: 2rem;
    @media screen and (min-width: 880px) {
      grid-template-columns: 0.6fr 1fr;
      min-height: 40rem;
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 2rem;
    @media screen and (min-width: 880px) {
      background-image: url("/img/signInHero.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom;
    }
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
export const Terms = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    a {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
    span {
      line-height: 1.3;
    }
  `}
`;

export const InputLineLink = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 1.2rem;
  `}
`;

export const Box = styled.div`
  padding: 2rem;
  @media screen and (min-width: 880px) {
    min-width: 40rem;
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

export const Show = styled.button`
  ${({ theme }) => css`
    width: 2.2rem;
    height: 2.2rem;
    padding: 0.3rem;
    transition: background 0.5s ease-in;
    border-radius: 10rem;
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.text};
    }
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
