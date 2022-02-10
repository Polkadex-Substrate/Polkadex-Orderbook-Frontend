import styled, { css } from "styled-components";

export const Main = styled.section<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    grid-area: News;
    position: relative;
    background: ${theme.colors.inverse};
    max-width: ${isFull ? "auto" : "35rem"};
    height: 100%;
    border-radius: 1rem;
    padding: 2rem;
  `}
`;

export const Container = styled.div``;
export const Actions = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 10rem;
    transition: border 0.3s ease-in-out;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    cursor: pointer;
    :hover {
      border-color: ${theme.colors.black};
    }
  `}
`;
export const Card = styled.div`
  ${({ theme }) => css`
    span {
      padding: 0.5rem;
      color: ${theme.colors.secondary};
      background: ${theme.colors.secondary}19;
      font-weight: 550;
      display: block;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      width: fit-content;
    }
    h3 {
      font-weight: 550;
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
    }
    p {
      opacity: 0.5;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    a {
      background: ${theme.colors.primary};
      color: ${theme.colors.white} !important;
      padding: 1rem;
      border-radius: 0.8rem;
      font-weight: 500;
      display: block;
      width: fit-content;
      transition: background 0.3s ease-in-out;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      :hover {
        background: transparent;
        color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
      }
    }
  `}
`;
