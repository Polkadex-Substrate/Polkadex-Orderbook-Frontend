import styled, { css } from "styled-components";

import { Wrapper as WrapperButton } from "src/ui/molecules/Button/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Graph;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadow.tertiary};
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid;
    border-bottom-color: ${theme.colors.secondaryBackground};
  `}
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  ul {
    list-style: none;
  }
`;

export const Li = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: inline-block;
    cursor: pointer;
    position: relative;
    opacity: ${isActive ? 1 : 0.6};
    font-weight: 550;
    :before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      border-bottom: 2px solid;
      border-bottom-color: ${isActive ? theme.colors.primary : "transparent"};
      bottom: -70%;
    }
    :not(:last-child) {
      margin-right: 1rem;
    }
  `}
`;

export const Actions = styled.div`
  ul {
    list-style: none;
    li {
      display: inline-block;
      cursor: pointer;

      :not(:last-child) {
        margin-right: 1rem;
        ${({ theme }) => css`
          background: ${theme.colors.primaryBackground};
          border-radius: 1rem;
          padding: 1rem;
        `}
      }
    }
  }
`;

export const Content = styled.div`
  height: 90%;
  min-height: 40rem;
`;
