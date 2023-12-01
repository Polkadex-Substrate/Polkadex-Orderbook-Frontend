import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";
export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: ${normalizeValue(100)};
  margin: 0 auto ${normalizeValue(5)} auto;
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
    margin: 0 ${normalizeValue(0.5)};
    span {
      display: block;
      margin-left: ${normalizeValue(1.5)};
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: -15%;
        top: -15%;
        width: 1px;
        height: ${normalizeValue(2)};
        background: ${theme.colors.text};
        opacity: 0.3;
      }
    }
  `}
`;

export const Content = styled.div``;

export const Status = styled.div`
  max-width: 60rem;
  padding: ${normalizeValue(10)} 0;
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 4rem;
    margin-top: ${normalizeValue(2)};
    margin-bottom: ${normalizeValue(1)};
  }
  p {
    font-size: ${normalizeValue(1.5)};
    margin-bottom: ${normalizeValue(2)};
  }
`;

export const Information = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(0.2)};
  `}
`;

export const Nav = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(2)};
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
  display: flex;
  align-items: center;
`;

export const AsideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: ${normalizeValue(0.5)};
  }
  &:not(:last-child) {
    margin-right: ${normalizeValue(1)};
  }
  @media screen and (max-width: 480px) {
    margin-top: ${normalizeValue(1)};
  }
`;

export const Table = styled.div`
  display: grid;
  @media screen and (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme.colors.secondaryBackground};
    padding: ${normalizeValue(2)};
    h5{
      font-size: ${normalizeValue(1.4)};
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
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.3)};
      margin-right: ${normalizeValue(0.5)};
      font-size: ${normalizeValue(1.2)};
      transition: background 0.5s;
      &:hover {
        background: ${theme.colors.primary};
      }
    }
    p {
      margin-top: ${normalizeValue(0.5)};
    }
  `}
`;
