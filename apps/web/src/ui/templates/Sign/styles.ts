import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: ${normalizeValue(160)};
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    font-size: ${normalizeValue(1.3)};
    @media screen and (max-width: 590px) {
      display: block;
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

export const Wrapper = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: ${normalizeValue(3)};
  }
`;

export const Container = styled.div`
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
    margin: ${normalizeValue(2)} ${normalizeValue(2)} ${normalizeValue(6)}
      ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      grid-template-columns: 0.6fr 1fr;
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};

    @media screen and (min-width: 880px) {
      background-image: url("/img/signHero.svg");
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
      line-height: 1.2;
      font-weight: 550;
      margin-bottom: ${normalizeValue(1.5)};
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Box = styled.div`
  padding: ${normalizeValue(2)};
  @media screen and (min-width: 880px) {
    padding: ${normalizeValue(4)};
    justify-self: center;
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

export const Disabled = styled.div`
  padding: ${normalizeValue(2)} 0;
  line-height: 1.5;
  @media screen and (min-width: 880px) {
    padding: ${normalizeValue(15)} 0;
  }
`;
