import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;

  @media screen and (max-width: 900px) {
    padding: 2rem;
    grid-template-columns: 1fr;
    row-gap: 3rem;
    text-align: center;
  }

  @media screen and (min-width: 900px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1200px) {
    padding: 2rem;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
  }
  margin: 0 auto;
  display: grid;
  align-items: center;
  column-gap: 4rem;
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
    font-size: 5rem;
    line-height: 1;
  }

  & p {
    margin: 2rem 0;
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
      border-radius: 10rem;
      padding: 1rem;
      background: ${theme.colors.secondaryBackground};
      width: 4rem;
      height: 4rem;
      transition: background 0.3s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  `}
`;

export const Message = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.text}55;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: left;
    & h3 {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1;
      color: ${theme.colors.orange};
    }
  `}
`;
