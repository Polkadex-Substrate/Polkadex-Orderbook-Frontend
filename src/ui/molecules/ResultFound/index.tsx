import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const ResultFound = ({ children = "No result found" }) => (
  <S.Wrapper>
    <S.Container>
      <Icons.SearchPixel />
      <p>{children}</p>
    </S.Container>
  </S.Wrapper>
);
