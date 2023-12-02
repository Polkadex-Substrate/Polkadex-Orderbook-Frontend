import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    max-width: ${normalizeValue(160)};
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
    margin-top: ${normalizeValue(3)};
  }
`;

export const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 880px) {
    min-width: ${normalizeValue(80)};
    max-width: ${normalizeValue(80)};
  }
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 ${normalizeValue(2)} ${normalizeValue(1)} ${normalizeValue(2)};
    div {
      max-width: ${normalizeValue(15)};
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
    border-radius: ${normalizeValue(2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      grid-template-columns: 0.6fr 1fr;
      min-height: ${normalizeValue(40)};
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      background-image: url("/img/signInHero.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom;
    }
    div {
      padding: ${normalizeValue(3)} ${normalizeValue(2.5)};
      max-width: calc(90%);
    }
    h2 {
      font-size: ${normalizeValue(2.2)};
      font-weight: 550;
      margin-bottom: ${normalizeValue(1.5)};
    }
    p {
      line-height: 1.4;
    }
  `}
`;
export const Terms = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.5)};
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
    font-size: ${normalizeValue(1.2)};
  `}
`;

export const Box = styled.div`
  padding: ${normalizeValue(2)};
  @media screen and (min-width: 880px) {
    min-width: ${normalizeValue(40)};
    padding: ${normalizeValue(4)};
    justify-self: center;
    align-self: center;
  }
  h1 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 550;
  }
  form {
    margin-top: ${normalizeValue(2)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
  }
`;

export const Show = styled.button`
  ${({ theme }) => css`
    width: ${normalizeValue(2.2)};
    height: ${normalizeValue(2.2)};
    padding: ${normalizeValue(0.3)};
    transition: background 0.5s ease-in;
    border-radius: ${normalizeValue(10)};
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
