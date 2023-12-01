import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
  text-align: center;
  h3 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 500;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;
export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(1.5)};
    border-radius: ${normalizeValue(0.4)};
    span {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const DefaultAccount = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(0.5)};
`;

export const Wallet = styled(Card)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.7)};
    p {
      strong {
        font-size: ${normalizeValue(1.2)};
        font-weight: normal;
        color: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WalletContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    button {
      width: ${normalizeValue(1.2)};
      height: ${normalizeValue(1.2)};

      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
