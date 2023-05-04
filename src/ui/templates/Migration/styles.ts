import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  background: #020303;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  column-gap: 4rem;
  flex: 1;
  flex-wrap: wrap;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    max-width: 50rem;
    padding: 4rem;
    p,
    a,
    span {
      font-size: 1.4rem;
    }
  `}
`;

export const Box = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    h1 {
      font-size: 5.5rem;
      font-weight: 550;
      line-height: 1;
    }
    p {
      color: ${theme.colors.tertiaryText};
      line-height: 1.5;
    }
    span {
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    span {
      display: block;
      :first-child {
        height: 3rem;
        width: 3rem;
      }
      :last-child {
        height: 4rem;
        width: 15rem;
        margin-left: 1rem;
        padding-left: 1rem;
        border-left: 1px solid ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 4rem;
    p {
      color: ${theme.colors.tertiaryText};
    }
    a {
      border-radius: 0.6rem;
      padding: 1rem;
      background: ${theme.colors.primary};
      transition: background-color 0.4s ease;
      :hover {
        background: ${theme.colors.primary}BF;
      }
    }
  `}
`;

export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6rem;
  img {
    width: 100%;
    max-width: 60rem;
  }
  h3 {
    font-weight: normal;
    font-size: 1.4rem;
  }
`;
export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CountDown = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 5rem;
    div {
      position: relative;
      :not(:last-child) {
        :before {
          font-size: 4rem;
          position: absolute;
          content: ":";
          right: -3.2rem;
          top: 20%;
        }
      }
    }
    span {
      font-size: 8rem;
    }
    p {
      font-size: 3rem;
      color: ${theme.colors.tertiaryText};
      opacity: 0.5;
      font-weight: 550;
    }
  `}
`;
