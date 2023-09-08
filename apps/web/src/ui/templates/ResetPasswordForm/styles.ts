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

export const BoxTitle = styled.div`
  p {
    margin-top: 1rem;
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
export const Success = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 8rem 2rem 9rem 2rem;
    border-radius: 2rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: 2rem;
    @media screen and (min-width: 880px) {
      min-height: 40rem;
    }
    div {
      width: 4rem;
      img {
        width: 100%;
      }
    }
    p {
      max-width: 50rem;
      line-height: 1.5;
    }
    small {
      opacity: 0.5;
    }
  `}
`;
