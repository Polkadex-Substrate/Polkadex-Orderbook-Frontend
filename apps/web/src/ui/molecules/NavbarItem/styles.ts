import styled, { css } from "styled-components";

import { NavbarItemPops } from ".";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div``;
export const Label = styled.span`
  font-size: ${normalizeValue(1.1)};
  color: #8ba1be;
  opacity: 0.7;
  font-weight: 500;
  white-space: nowrap;
`;
export const Info = styled.p<Partial<NavbarItemPops>>`
  ${({ theme, color }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${color === "primary"
      ? theme.colors.primary
      : color === "green"
      ? theme.colors.green
      : "inherit"};
    font-weight: 600;
  `}
`;
