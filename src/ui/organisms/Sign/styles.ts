import styled, { css } from "styled-components";

import { Wrapper as InputWrapper } from "src/ui/molecules/Input/styles";
export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: #30313b;
    border-radius: 1rem;
    min-width: 35rem;
    max-width: 38rem;
    box-shadow: ${theme.shadow.tertiary};
    h4 {
      margin-bottom: 1rem;
      font-weight: 500;
      font-size: ${theme.font.sizes.small};
      padding-left: 1rem;
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    display: flex;
    align-items: center;
    h3 {
      font-size: ${theme.font.sizes.xsmall};
      margin-left: 1rem;
      font-weight: 500;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    border-radius: 1rem;
    background: ${theme.colors.gradientBackground};
  `}
`;

export const TabHeader = styled.ul`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryBackground};
    border-radius: 0.8rem;
    list-style: none;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    li {
      text-align: center;
      padding: 1.4rem;
      cursor: pointer;
      font-weight: 600;
    }
  `}
`;
export const ListItem = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    background-color: ${isActive ? theme.colors.primary : "none"};
    border-radius: 0.8rem;
  `}
`;

export const TabContent = styled.ul`
  ${({ theme }) => css`
    background: ${theme.colors.gradientBackground};
  `}
`;

export const LoginWrapper = styled.ul`
  ${InputWrapper} {
    margin: 1rem 0;
  }
`;

export const SignUpWrapper = styled.ul`
  ${InputWrapper} {
    margin: 1rem 0;
  }
`;
export const SignUpConteiner = styled.ul`
  p {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.xxsmall};
      padding: 0 2rem;
      margin: 2rem 0;
      text-align: center;
      font-weight: 500;
    `}
  }
`;
