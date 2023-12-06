import styled, { css } from "styled-components";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border-radius: ${normalizeValue(0.8)};
    padding: ${normalizeValue(0.4)};
    ${Icon} {
      cursor: pointer;
      hover: {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
