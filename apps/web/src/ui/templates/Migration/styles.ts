import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

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
  column-gap: ${normalizeValue(4)};
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
    gap: ${normalizeValue(1.5)};
    max-width: 1000px;

    padding: ${normalizeValue(2)};
    max-height: ${normalizeValue(50)};
    min-height: ${normalizeValue(50)};
    overflow: auto;
    background-color: ${theme.colors.black};
    color: ${theme.colors.tertiaryText};

    font-size: ${normalizeValue(1.5)};
    border-radius: ${normalizeValue(1)};
    button {
      background-color: ${theme.colors.primary};
      width: max-content;
      padding: ${normalizeValue(1)} ${normalizeValue(2)};
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
    width: ${normalizeValue(20)};
    height: ${normalizeValue(10)};
    border-radius: 0 0 ${normalizeValue(10)} ${normalizeValue(10)};
  `}
`;

export const Outer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: ${normalizeValue(40)};
    height: ${normalizeValue(20)};
    border-radius: 0 0 ${normalizeValue(20)} ${normalizeValue(20)};
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
    gap: ${normalizeValue(2)};
    flex: 1;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(2)};
    p,
    a,
    span {
      font-size: ${normalizeValue(1.4)};
    }
    @media screen and (min-width: 855px) {
      max-width: ${normalizeValue(50)};
    }
    @media screen and (min-width: 1006px) {
      padding: ${normalizeValue(4)};
    }
  `}
`;

export const Box = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    h1 {
      font-size: ${normalizeValue(5.5)};
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
    margin-bottom: ${normalizeValue(1)};
    span {
      display: block;
      &:first-child {
        height: ${normalizeValue(3)};
        width: ${normalizeValue(3)};
      }
      &:last-child {
        height: ${normalizeValue(4)};
        width: ${normalizeValue(15)};
        margin-left: ${normalizeValue(1)};
        padding-left: ${normalizeValue(1)};
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
    gap: ${normalizeValue(1)};
    margin-top: ${normalizeValue(4)};
    p {
      color: ${theme.colors.tertiaryText};
    }
    a {
      border-radius: ${normalizeValue(0.6)};
      padding: ${normalizeValue(1)};
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
  margin-top: ${normalizeValue(3)};
  gap: ${normalizeValue(6)};
  flex: 1;
  padding: 0 ${normalizeValue(2)};
  img {
    width: 100%;
    max-width: ${normalizeValue(60)};
  }
  h3 {
    font-weight: normal;
    font-size: ${normalizeValue(1.4)};
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
    gap: ${normalizeValue(3)};
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
    gap: ${normalizeValue(5)};
    div {
      position: relative;
      &:not(:last-child) {
        &:before {
          font-size: ${normalizeValue(4)};
          position: absolute;
          content: ":";
          right: ${normalizeValue(-3.2)};
          top: 20%;
        }
      }
    }
    span {
      font-size: ${normalizeValue(8)};
    }
    p {
      font-size: ${normalizeValue(3)};
      color: ${theme.colors.tertiaryText};
      opacity: 0.5;
      font-weight: 550;
    }
    span {
      color: ${theme.colors.white};
    }
    @media screen and (max-width: 612px) {
      span {
        font-size: ${normalizeValue(4)};
      }
      p {
        font-size: ${normalizeValue(1.5)};
      }
    }
  `}
`;

export const InfoButton = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    font-weight: 550;
    border-radius: ${normalizeValue(0.6)};

    padding: ${normalizeValue(2)} ${normalizeValue(1)};
    width: 100%;
    background-color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.large};
    @media screen and (max-width: 455px) {
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;
