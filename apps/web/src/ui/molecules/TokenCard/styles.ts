import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${normalizeValue(2)};
    cursor: pointer;
    transition: background-color ease-in 0.2s;
    border-radius: ${normalizeValue(0.5)};
    width: 100%;
    &:hover {
      background: ${theme.colors.tertiaryBackgroundOpacity};
    }
    @media screen and (min-width: 640px) {
      max-width: ${normalizeValue(29)};
    }
  `}
`;

export const AsideLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.8)};
`;

export const TokenWrapper = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(4.2)};
    height: ${normalizeValue(4.2)};
    padding: ${normalizeValue(0.7)};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(10)};
  `}
`;

export const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.4)};
  p {
    font-size: ${normalizeValue(1.6)};
    font-weight: 550;
  }
  span {
    opacity: 0.5;
  }
`;

export const AsideRight = styled.div`
  width: ${normalizeValue(1)};
`;
