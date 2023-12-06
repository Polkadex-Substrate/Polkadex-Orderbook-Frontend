import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";
export const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: ${normalizeValue(200)};
    /* border: 1px solid ${theme.colors.secondaryBackground}; */
    svg {
      fill: white;
    }
  `}
`;

export const Text = styled.text`
  font-size: ${normalizeValue(1.05)};
  font-weight: 600;
`;
