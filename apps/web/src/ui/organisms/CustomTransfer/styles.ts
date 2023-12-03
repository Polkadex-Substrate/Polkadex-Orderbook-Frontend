import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
  max-width: ${normalizeValue(100)};
  padding: ${normalizeValue(2)};
  @media screen and (min-width: 1110px) {
    padding: ${normalizeValue(2)} ${normalizeValue(4)} ${normalizeValue(4)}
      ${normalizeValue(4)};
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div``;
