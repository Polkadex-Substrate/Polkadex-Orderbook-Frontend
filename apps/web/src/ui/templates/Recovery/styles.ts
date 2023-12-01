import styled, { css } from "styled-components";
import { Primary as Input } from "@polkadex/orderbook-ui/molecules/Input/styles";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `}
`;

export const Wrapper = styled.section`
  display: grid;
  grid-gap: ${normalizeValue(5)};
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;
  flex: 1;

  @media screen and (max-width: 920px) {
    padding: 0 ${normalizeValue(2)};
  }

  @media screen and (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Content = styled.div``;

export const Container = styled.div`
  padding-top: ${normalizeValue(8)};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex: 1;
`;

export const AsideRight = styled.div``;

export const AsideLeft = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    h1 {
      font-size: 3.5rem;
    }
    p {
      font-size: ${normalizeValue(1.5)};
    }
    a {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  `}
`;

export const Form = styled.div`
  padding: ${normalizeValue(5)} 0;
  ${Input} {
    margin-top: ${normalizeValue(1)};
  }
`;

export const SelectContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryBackgroundSolid};
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(0.5)};
    width: 100%;
    shadow: ${theme.shadows.primary};
    max-height: ${normalizeValue(20)};
    overflow-y: scroll;
    scrollbar-width: none;
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.primary};
      font-weight: bold;
    }
  `}
`;

export const Box = styled.div`
  padding: ${normalizeValue(2)};
  @media screen and (min-width: 920px) {
    padding: 4rem;
  }
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    border-radius: ${normalizeValue(2)};
    height: 100%;
    padding-top: ${normalizeValue(8)};
  `}
`;

export const CardContent = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(3)};
    @media screen and (min-width: 920px) {
      padding: 4rem;
    }
    h4 {
      font-size: ${normalizeValue(1.6)};
      margin: ${normalizeValue(1)} 0 ${normalizeValue(2)} 0;
    }
    p {
      line-height: 1.5;
    }
    p,
    h4 {
      color: ${theme.colors.inverse};
    }

    strong {
      margin-top: ${normalizeValue(2)};
    }
    strong {
      display: block;
    }
  `}
`;
