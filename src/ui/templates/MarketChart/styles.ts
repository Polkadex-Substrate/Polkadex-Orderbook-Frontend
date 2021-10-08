import styled, { css } from "styled-components";

import { Wrapper as WrapperButton } from "src/ui/molecules/Button/styles";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Graph;
    background: ${theme.colors.gradientBackground};
    padding: 1rem;
    box-shadow: ${theme.shadow.tertiary};
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ChartHeaderNav = styled.div`
  display: flex;
  align-items: center;
  ul {
    list-style: none;
    li {
      display: inline-block;
      cursor: pointer;
      :not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;

export const ChartHeaderOptions = styled.div`
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

export const ChartHeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  ${WrapperButton} {
    :first-child {
      margin-right: 1rem;
    }
  }
`;

export const Content = styled.div`
  height: 90%;
`;
