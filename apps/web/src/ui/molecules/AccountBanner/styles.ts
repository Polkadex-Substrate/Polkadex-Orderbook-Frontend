import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  min-height: ${normalizeValue(28)};
  max-width: ${normalizeValue(60)};
  display: flex;
  position: relative;
`;
export const Close = styled.button`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: ${normalizeValue(2.5)};
    right: ${normalizeValue(2.5)};
    width: ${normalizeValue(3)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(5)};
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
export const Container = styled.div`
  ${({ theme }) => css`
    height: 100%;
    flex: 1;
    display: grid;
    align-items: center;
    background: ${theme.colors.primaryBackground};
    border-radius: ${normalizeValue(1.2)};
    @media screen and (min-width: 620px) {
      grid-template-columns: 1.2fr 1fr;
    }
  `}
`;

export const Column = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  justify-content: center;
  img {
    width: 100%;
    max-width: ${normalizeValue(40)};
    margin-left: ${normalizeValue(-2)};
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: ${normalizeValue(1.5)};
    @media screen and (min-width: 500px) {
      padding: ${normalizeValue(3)};
    }
    div {
      &:first-child {
        h2 {
          font-weight: 550;
          margin-bottom: ${normalizeValue(1)};
        }
        p: last-child {
          margin-top: ${normalizeValue(1)};
        }
      }
      &:last-child {
        display: flex;
        justify-content: flex-end;
        gap: ${normalizeValue(2)};
        margin-top: ${normalizeValue(2)};
        a {
          border-radius: ${normalizeValue(1)};
          padding: ${normalizeValue(1.2)};
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          transition:
            background-color 0.3s ease-in-out,
            color 0.3s ease-in-out;
          &:hover {
            background: ${theme.colors.primary}33;
            color: ${theme.colors.primary};
          }
        }
        button {
          color: ${theme.colors.tertiaryText};
          transition: color 0.3s ease-in-out;
          &:hover {
            color: ${theme.colors.text};
          }
        }
      }
    }
  `}
`;
