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
    flex-direction: column;
  `}
`;
export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  @media screen and (min-width: 590px) {
    padding: 4rem 4rem 10rem 4rem;
  }
`;

export const Title = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryText};
    cursor: pointer;
    transition: color 0.5s ease-in;
    width: fit-content;
    div {
      vertical-align: middle;
      display: inline-block;
      width: 3rem;
      height: 3rem;
      padding: 0.8rem;
      border-radius: 10rem;
      border: 1px solid ${theme.colors.secondaryBackground};
      margin-right: 0.8rem;
      transition: border 0.5s ease-in;

      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
    }
    :hover {
      color: ${theme.colors.text};
      div {
        border-color: ${theme.colors.text};
      }
    }
  `}
`;
export const ColumnWrapper = styled.div`
  padding: 3.5rem;
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 2rem;
    background-image: url("/img/createAccountHero.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
    @media screen and (min-width: 830px) {
      background-position: bottom;
    }
    @media screen and (max-height: 770px), (max-width: 830px) {
      background-image: none;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 550;
      margin-bottom: 1.5rem;
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Download = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    span {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      vertical-align: middle;
      svg {
        fill: ${theme.colors.secondaryText};
      }
    }
  `}
`;

export const Container = styled.div`
  flex: 1;
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  @media screen and (min-width: 830px) {
    grid-template-columns: minmax(25rem, 30rem) 1fr;
  }
`;

export const Box = styled.div`
  margin-top: 2rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  @media screen and (min-width: 830px) {
    padding: 8rem 4rem 4rem 4rem;
    max-width: 40rem;
  }
`;

export const Available = styled.span`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: 1.3rem;
    strong {
      color: ${theme.colors.text};
      font-weight: 500;
    }
  `}
`;
