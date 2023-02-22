import styled, { css } from "styled-components";

import { NavbarItemPops } from ".";

export const Wrapper = styled.div``;
export const Label = styled.span`
  ${({ theme }) => css`
    font-size: 1.4rem;
    color: #8ba1be;
    /* opacity: 0.7; */
    font-weight: 500;
    white-space: nowrap;
  `}
`;
export const Info = styled.p<Partial<NavbarItemPops>>`
  ${({ theme, color }) => css`
    /* font-size: ${theme.font.sizes.medium}; */
    font-size: 2.2rem;
    color: ${color === "primary"
      ? theme.colors.primary
      : color === "green"
      ? theme.colors.green
      : "inherit"};
    font-weight: 800;
  `}
`;
