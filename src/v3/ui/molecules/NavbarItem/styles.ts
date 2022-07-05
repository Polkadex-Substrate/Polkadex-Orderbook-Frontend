import styled, { css } from "styled-components";

import { NavbarItemPops } from ".";

export const Wrapper = styled.div``;
export const Label = styled.span`
  ${({ theme }) => css`
    font-size: 1.1rem;
    color: #8ba1be;
    opacity: 0.7;
    font-weight: 500;
    white-space: nowrap;
  `}
`;
export const Info = styled.p<Partial<NavbarItemPops>>`
  ${({ theme, color }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${color ? theme.colors.primary : "inherit"};
    font-weight: 550;
  `}
`;
