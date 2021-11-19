import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    padding: 0.4rem;
    ${Icon} {
      cursor: pointer;
      hover: {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
