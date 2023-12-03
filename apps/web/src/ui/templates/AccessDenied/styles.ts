import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    min-height: 100vh;
    display: flex;
    background: ${theme.colors.primaryBackground};
  `}
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  column-gap: ${normalizeValue(2)};
  flex: 1;
`;

export const Header = styled.div`
  padding: ${normalizeValue(2)} ${normalizeValue(1)};
`;

export const LogoWrapper = styled.a`
  max-width: ${normalizeValue(12)};
  margin: 0 auto;
  display: block;
  cursor: pointer;
`;
export const Content = styled.div`
  flex: 1;
  background: linear-gradient(
    182.33deg,
    rgba(139, 161, 190, 0.05) 1.95%,
    rgba(139, 161, 190, 0) 62.7%
  );
  filter: drop-shadow(0px -11px 128px rgba(0, 0, 0, 0.52));
  border-radius: 30px;
  @media screen and (min-width: 930px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
`;

export const AsideLeft = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${normalizeValue(3)};
    @media screen and (min-width: 1200px) {
      padding: ${normalizeValue(5)};
      max-width: ${normalizeValue(48)};
    }
    @media screen and (min-width: 930px) and (max-width: 1200px) {
      max-width: ${normalizeValue(40)};
    }
    @media screen and (max-width: 930px) {
      margin-bottom: ${normalizeValue(4)};
    }
    span {
      width: fit-content;
      background: ${theme.colors.primary};
      color: ${theme.colors.black};
      border-radius: ${normalizeValue(0.5)};
      padding: ${normalizeValue(0.2)} ${normalizeValue(0.4)};
      font-weight: bold;
      font-size: ${normalizeValue(1.5)};
    }
    h1 {
      font-size: ${normalizeValue(5)};
      font-weight: 600;
      margin-bottom: ${normalizeValue(1.5)};
    }
    p {
      font-size: ${normalizeValue(1.6)};
      line-height: 1.4;
      a {
        color: ${theme.colors.primary};
        font-weight: 500;
      }
    }

    small {
      margin-top: ${normalizeValue(3)};
      font-size: ${normalizeValue(1.4)};
      color: gray;
    }
  `}
`;
export const AsideRight = styled.div`
  svg {
    width: 100%;
  }
`;
export const Social = styled.div`
  ${({ theme }) => css`
    margin-top: ${normalizeValue(1)};
    a {
      display: flex;
      align-items: center;
      gap: ${normalizeValue(0.8)};
      border-radius: ${normalizeValue(1)};
      background: ${theme.colors.secondaryBackground};
      width: fit-content;
      padding: ${normalizeValue(0.8)} ${normalizeValue(1)};
      font-size: ${normalizeValue(1.4)};
      transition: background-color 0.4s ease-in-out;
      div {
        width: ${normalizeValue(2)};
        height: ${normalizeValue(2)};
      }
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
