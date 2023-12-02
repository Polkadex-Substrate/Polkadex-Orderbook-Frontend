import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const ContentMain = styled.div`
  ${() => css`
    &.enter ${ContentWrapper} {
      opacity: 0;
      transform: scale(0.95);
      transition:
        opacity 120ms,
        transform 120ms;
    }
    &.enter-active ${ContentWrapper} {
      opacity: 1;
      transform: scale(1.05);
    }
    &.enter-done ${ContentWrapper} {
      opacity: 1;
      transform: scale(1);
      transition:
        opacity 120ms,
        transform 120ms ease-out;
    }

    &.exit ${ContentWrapper} {
      opacity: 1;
      transform: scale(1);
    }
    &.exit-active ${ContentWrapper} {
      opacity: 0;
      transform: scale(0.5);
      transition:
        opacity 60ms,
        transform 60ms;
    }
  `}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${normalizeValue(2)};
  max-width: calc(100% - ${normalizeValue(2)};);
  min-height: ${normalizeValue(2)};
  max-height: calc(100% - ${normalizeValue(2)};);
  overflow: hidden auto;
`;
