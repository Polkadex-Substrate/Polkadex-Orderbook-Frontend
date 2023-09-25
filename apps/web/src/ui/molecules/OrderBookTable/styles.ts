import styled, { css } from "styled-components";
import { Wrapper as EmptyData } from "@polkadex/orderbook-ui/molecules/EmptyData/styles";
import { Table, Body } from "@polkadex/orderbook-ui/organisms/Orderbook/styles";

export const Wrapper = styled.div<{ filterBy?: string }>`
  ${({ filterBy }) => css`
    flex: 1;
    display: flex;
    flex-flow: ${filterBy && ["OrderDesc"].includes(filterBy)
        ? "column-reverse"
        : "column"}
      nowrap;
    height: 100%;
    overflow: hidden;
    @media screen and (max-width: 700px) {
      ${EmptyData} {
        padding: 3rem 1rem;
      }
    }
    ${Table}:first-child {
      display: ${filterBy && ["OrderDesc", "Order"].includes(filterBy)
        ? "flex"
        : "none"};
      ${Body} {
        justify-content: ${filterBy && ["Order"].includes(filterBy)
          ? "flex-end"
          : "flex-start"};
      }
    }
    ${Table}:last-child {
      display: ${filterBy && ["OrderAsc", "Order"].includes(filterBy)
        ? "flex"
        : "none"};
    }
  `}
`;
