import styled, { css } from "styled-components";

import Props from "./types";
export const Wrapper = styled.a<Pick<Props, "active" | "icon">>`
  ${({ theme, active, icon }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    filter: ${active ? "none" : "grayscale(100%) opacity(0.7)"};
    & :hover {
      filter: grayscale(0%) opacity(1);
    }
    & span {
      margin-left: ${icon ? "1.4rem" : 0};
      font-size: ${theme.font.sizes.small};
      font-weight: 600;
      display: "block";
    }
  `}
`;
