import styled, { css } from "styled-components";

import { Link as LogoWrapper } from "src/ui/atoms/Logo/styles";
import { Wrapper as SwitchWrapper } from "src/ui/molecules/ThemeSwitch/styles";
export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadow.primary};
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
  flex-direction: row;
  align-items: center;
  ${LogoWrapper} {
    margin-right: 2rem;
  }

  :last-child {
    flex-direction: row;
    align-items: center;
    ${SwitchWrapper} {
      margin-right: 0.5rem;
    }
  }
`;
