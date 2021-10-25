import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-width: 100rem;
    margin: 0 auto 5rem auto;
  `}
`;

export const Header = styled.header`
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    span {
      display: block;
      margin-left: 1.5rem;
      position: relative;
      :before {
        content: "";
        position: absolute;
        left: -15%;
        top: -15%;
        width: 1px;
        height: 2rem;
        background: ${theme.colors.text};
        opacity: 0.3;
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css``}
`;

export const Status = styled.div`
  ${({ theme }) => css`
    max-width: 60rem;
    padding: 10rem 0;
    margin: 0 auto;
    text-align: center;
    h1 {
      font-size: 4rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  `}
`;

export const Information = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 0.2rem;
  `}
`;

export const Nav = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    background: ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

export const Aside = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
  `}
`;

export const AsideContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-left: 0.5rem;
    }
    :not(:last-child) {
      margin-right: 1rem;
    }
    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  `}
`;

export const Table = styled.div`
  ${({ theme }) => css`
    display: grid;
    @media screen and (min-width: 750px) {
      grid-template-columns: 1fr 1fr;
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme.colors.secondaryBackground};
    padding: 2rem;
    h5{
      font-size: 1.4rem;
      line-height: 1.5;
    }
    }
  `}
`;

export const CardContainer = styled.div`
  ${({ theme }) => css`
    h5 {
      line-height: 1;
    }
    h5,
    button {
      display: inline-block;
    }
    button {
      background: ${theme.colors.secondaryBackground};
      padding: 0.5rem;
      border-radius: 0.3rem;
      margin-right: 0.5rem;
      font-size: 1.2rem;
      transition: background 0.5s;
      :hover {
        background: ${theme.colors.primary};
      }
    }
    p {
      margin-top: 0.5rem;
    }
  `}
`;
