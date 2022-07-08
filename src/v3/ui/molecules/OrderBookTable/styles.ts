import styled, { css } from "styled-components";

import { Wrapper as EmptyData } from "@orderbook/v2/ui/molecules/EmptyData/styles";
import { Table, Body } from "@polkadex/orderbook/v2/ui/organisms/Orderbook/styles";

export const Wrapper = styled.div<{ filterBy?: string }>`
  ${({ filterBy }) => css`
    flex: 1;
    display: flex;
    flex-flow: ${["OrderDesc"].includes(filterBy) ? "column-reverse" : "column"} nowrap;
    height: 100%;
    overflow: hidden;
    @media screen and (max-width: 700px) {
      ${EmptyData} {
        padding: 3rem 1rem;
      }
    }
    ${Table}:first-child {
      display: ${["OrderDesc", "Order"].includes(filterBy) ? "flex" : "none"};
      ${Body} {
        justify-content: ${["Order"].includes(filterBy) ? "flex-end" : "flex-start"};
      }
    }
    ${Table}:last-child {
      display: ${["OrderAsc", "Order"].includes(filterBy) ? "flex" : "none"};
    }
  `}
`;
