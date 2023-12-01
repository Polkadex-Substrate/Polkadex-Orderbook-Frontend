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

export const Title = styled.div`
  text-align: center;
  margin-bottom: ${normalizeValue(3)};
  padding-bottom: ${normalizeValue(3)};
  h2 {
    font-size: ${normalizeValue(2)};
    font-weight: 500;
    margin-bottom: ${normalizeValue(0.8)};
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  align-self: flex-end;
  margin-top: ${normalizeValue(3)};
  ${Button} {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;
