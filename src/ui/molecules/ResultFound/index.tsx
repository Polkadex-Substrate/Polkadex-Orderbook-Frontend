import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const ResultFound = ({ children = "No result found" }) => (
  <S.Wrapper>
    <Icons.SearchPixel />
    <p>{children}</p>
  </S.Wrapper>
);
