import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    & ul {
      list-style: none;
      padding: ${normalizeValue(1)};
      border-radius: ${theme.border.radius.primary.small};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: ${normalizeValue(0.3)};
    padding: ${normalizeValue(1.5)};
    background: ${theme.colors.primaryBackground};
    border-radius: ${theme.border.radius.primary.small};
  `}
`;

export const WrapperTab = styled.li``;
