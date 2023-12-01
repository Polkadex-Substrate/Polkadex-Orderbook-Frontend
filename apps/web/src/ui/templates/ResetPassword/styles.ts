import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
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
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow-y: scroll;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: ${normalizeValue(3)};
  }
`;

export const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 880px) {
    min-width: 80rem;
    max-width: 80rem;
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
      max-width: 15rem;
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
    grid-template-columns: auto 1fr;
    border-radius: ${normalizeValue(2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      min-height: 40rem;
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
    width: ${normalizeValue(3)};
  `}
`;

export const Box = styled.div`
  padding: ${normalizeValue(2)};
  width: 100%;
  @media screen and (min-width: 880px) {
    max-width: 40rem;
    padding: 4rem;
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

export const BoxTitle = styled.div`
  p {
    margin-top: ${normalizeValue(1)};
  }
`;

export const Success = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(2)} ${normalizeValue(2)} ${normalizeValue(5)} ${normalizeValue(2)};
    border-radius: ${normalizeValue(2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      min-height: 40rem;
    }
    div {
      width: ${normalizeValue(20)};
      img {
        width: 100%;
      }
    }
    p {
      max-width: ${normalizeValue(50)};
      line-height: 1.5;
    }
    small {
      opacity: 0.5;
    }
  `}
`;
