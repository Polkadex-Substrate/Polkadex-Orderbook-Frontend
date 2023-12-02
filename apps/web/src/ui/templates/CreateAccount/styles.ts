import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    max-width: ${normalizeValue(160)};
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
  padding: ${normalizeValue(2)};
  @media screen and (min-width: 590px) {
    padding: ${normalizeValue(4)} ${normalizeValue(4)} ${normalizeValue(10)}
      ${normalizeValue(4)};
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
      width: ${normalizeValue(3)};
      height: ${normalizeValue(3)};
      padding: ${normalizeValue(0.8)};
      border-radius: ${normalizeValue(10)};
      border: 1px solid ${theme.colors.secondaryBackground};
      margin-right: ${normalizeValue(0.8)};
      transition: border 0.5s ease-in;

      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
    }
    &:hover {
      color: ${theme.colors.text};
      div {
        border-color: ${theme.colors.text};
      }
    }
  `}
`;
export const ColumnWrapper = styled.div`
  padding: ${normalizeValue(3.5)};
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
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
      font-size: ${normalizeValue(2.2)};
      font-weight: 550;
      margin-bottom: ${normalizeValue(1.5)};
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
    gap: ${normalizeValue(1)};
    margin-top: ${normalizeValue(2)};
    span {
      display: inline-block;
      width: ${normalizeValue(1.5)};
      height: ${normalizeValue(1.5)};
      margin-right: ${normalizeValue(0.5)};
      vertical-align: middle;
      svg {
        fill: ${theme.colors.secondaryText};
      }
    }
  `}
`;

export const Container = styled.div`
  flex: 1;
  margin-top: ${normalizeValue(2)};
  display: grid;
  gap: ${normalizeValue(1)};
  @media screen and (min-width: 830px) {
    grid-template-columns: minmax(${normalizeValue(25)}, ${normalizeValue(30)}) 1fr;
  }
`;

export const Box = styled.div`
  margin-top: ${normalizeValue(2)};
  form {
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
  }
  @media screen and (min-width: 830px) {
    padding: ${normalizeValue(8)} ${normalizeValue(4)} ${normalizeValue(4)}
      ${normalizeValue(4)};
    max-width: ${normalizeValue(40)};
  }
`;

export const Available = styled.span`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: ${normalizeValue(1.3)};
    strong {
      color: ${theme.colors.text};
      font-weight: 500;
    }
  `}
`;
