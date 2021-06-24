import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

import { Props } from "./types";
export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: Graph;
    background: ${theme.colors.gradientBackground};
    border-radius: ${theme.border.radius.primary.medium};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex: 1;
  `}
`;

// Chart
export const WrapperChart = styled.div`
  ${({ theme }) => css`
    flex: 1;
  `}
`;
export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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
export const ChartContent = styled.div`
  height: 100%;
`;
