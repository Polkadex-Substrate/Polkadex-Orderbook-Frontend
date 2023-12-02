import styled, { css } from "styled-components";
import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: ${normalizeValue(1.5)};
    padding: ${normalizeValue(3)};
    form {
      display: flex;
      flex-direction: column;
      gap: ${normalizeValue(1)};
      margin: 0 auto;
    }
  `}
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    margin: 0 auto ${normalizeValue(2)} auto;
    display: block;
    width: fit-content;
    padding: ${normalizeValue(0.6)};
    color: ${theme.colors.primary};
    border-radius: ${normalizeValue(0.4)};
    border: 1px solid ${theme.colors.primary};
    background: ${theme.colors.primary}11;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-bottom: ${normalizeValue(3)};
    padding-bottom: ${normalizeValue(3)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: ${normalizeValue(2)};
      font-weight: 500;
      margin-bottom: ${normalizeValue(0.8)};
    }
  `}
`;

export const Strong = styled.strong`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-weight: 500;
  `}
`;

export const Actions = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  align-self: flex-end;
  margin-top: ${normalizeValue(3)};
  ${Button} {
    padding-left: ${normalizeValue(4)};
    padding-right: ${normalizeValue(4)};
  }
`;
