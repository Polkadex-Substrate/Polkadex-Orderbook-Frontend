import styled, { css } from "styled-components";

import { Link as LogoWrapper } from "src/ui/molecules/Logo/styles";

export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.colors.gradientBackground};
    padding: 0.5rem 1rem;
    z-index: ${theme.layers.alwaysOnTop};
  `}
`;

export const Container = styled.div`
  max-width: 140rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${LogoWrapper} {
    margin-right: 2rem;
  }
  :first-child {
    @media screen and (min-width: 1050px) {
      flex-direction: row;
      align-items: center;
    }
  }
`;
