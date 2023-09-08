import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  background: #020303;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  column-gap: 4rem;
  flex: 1;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 945px) {
    justify-content: flex-start;
  }
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 1000px;

    padding: 2rem;
    max-height: 50rem;
    min-height: 50rem;
    overflow: auto;
    background-color: ${theme.colors.black};
    color: ${theme.colors.tertiaryText};

    font-size: 1.5rem;
    border-radius: 1rem;
    button {
      background-color: ${theme.colors.primary};
      width: max-content;
      padding: 1rem 2rem;
      color: ${theme.colors.text};
      border-radius: ${theme.border.radius.small};
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Inner = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    width: 20rem;
    height: 10rem;
    border-radius: 0 0 10rem 10rem;
  `}
`;

export const Outer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 40rem;
    height: 20rem;
    border-radius: 0 0 20rem 20rem;
    background: ${theme.colors.primary}22;
    display: flex;
    justify-content: center;
    top: 0;
    right: 0;
    @media screen and (max-width: 855px) {
      display: none;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 2rem;
    p,
    a,
    span {
      font-size: 1.4rem;
    }
    @media screen and (min-width: 855px) {
      max-width: 50rem;
    }
    @media screen and (min-width: 1006px) {
      padding: 4rem;
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
    span,
    h1 {
      color: ${theme.colors.white};
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
      &:first-child {
        height: 3rem;
        width: 3rem;
      }
      &:last-child {
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
      color: ${theme.colors.white};
      transition: background-color 0.4s ease;
      &:hover {
        background: ${theme.colors.primary}BF;
      }
    }
  `}
`;

export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  margin-top: 3rem;
  gap: 6rem;
  flex: 1;
  padding: 0 2rem;
  img {
    width: 100%;
    max-width: 60rem;
  }
  h3 {
    font-weight: normal;
    font-size: 1.4rem;
  }

  @media screen and (min-width: 855px) {
    align-items: flex-start;
  }
`;

export const TimerWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    h3 {
      color: ${theme.colors.white};
    }
    @media screen and (min-width: 855px) {
      align-items: flex-start;
    }
  `}
`;

export const CountDown = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 5rem;
    div {
      position: relative;
      &:not(:last-child) {
        &:before {
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
    span {
      color: ${theme.colors.white};
    }
    @media screen and (max-width: 612px) {
      span {
        font-size: 4rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  `}
`;

export const InfoButton = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    font-weight: 550;
    border-radius: 0.6rem;

    padding: 2rem 1rem;
    width: 100%;
    background-color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.large};
    @media screen and (max-width: 455px) {
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;
