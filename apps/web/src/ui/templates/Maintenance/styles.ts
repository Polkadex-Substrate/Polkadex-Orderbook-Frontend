import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;

  @media screen and (max-width: 900px) {
    padding: ${normalizeValue(2)};
    grid-template-columns: 1fr;
    row-gap: ${normalizeValue(3)};
    text-align: center;
  }

  @media screen and (min-width: 900px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1200px) {
    padding: ${normalizeValue(2)};
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
  }
  margin: 0 auto;
  display: grid;
  align-items: center;
  column-gap: ${normalizeValue(4)};
`;

export const TitleContainer = styled.div``;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  & h1 {
    font-size: ${normalizeValue(5)};
    line-height: 1;
  }

  & p {
    margin: ${normalizeValue(2)} 0;
    line-height: 1.7;
  }
`;

export const SocialIcons = styled.div`
  ${({ theme }) => css`
    display: flex;
    @media screen and (max-width: 900px) {
      justify-content: center;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${normalizeValue(10)};
      padding: ${normalizeValue(1)};
      background: ${theme.colors.secondaryBackground};
      width: ${normalizeValue(4)};
      height: ${normalizeValue(4)};
      transition: background 0.3s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:not(:last-child) {
        margin-right: ${normalizeValue(1)};
      }
    }
  `}
`;
