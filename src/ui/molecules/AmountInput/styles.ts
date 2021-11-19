import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.gradientBackground};
    border-radius: 1rem;
    padding: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Header = styled.div``;

export const Content = styled.div`
  margin-top: 1.5rem;
`;

export const Column = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    :first-child {
      margin-bottom: 1rem;
      input {
        font-size: ${theme.font.sizes.xlarge};
        color: ${theme.colors.text};
      }

      span {
        font-weight: 500;
        background: ${theme.colors.secondaryBackground};
        padding: 0.5rem;
        border-radius: 0.5rem;
      }
      button {
        font-size: ${theme.font.sizes.xxxsmall};
        background: ${theme.colors.secondaryBackground};
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-right: 0.5rem;
        opacity: 0.5;
        transition: opacity 0.8s;
        :hover {
          opacity: 1;
        }
      }
    }
    :last-child {
      span {
        display: block;
        opacity: 0.5;
        font-size: ${theme.font.sizes.xxsmall};
      }
    }
  `}
`;

export const TokensWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: ${theme.shadows.tertiary};
    max-height: 15rem;
    overflow-y: scroll;
    scrollbar-width: none;
  `}
`;

export const Card = styled.div`
  display: flex;
  flex: 1;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const CardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.5rem;
    flex: 1;
    p {
      font-size: ${theme.font.sizes.xxsmall};
    }
  `}
`;

export const CardFlex = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
    }
  `}
`;
