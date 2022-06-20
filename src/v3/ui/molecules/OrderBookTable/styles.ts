import styled from "styled-components";

import { Wrapper as EmptyData } from "@orderbook/v2/ui/molecules/EmptyData/styles";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    ${EmptyData} {
      padding: 3rem 1rem;
    }
  }
`;
