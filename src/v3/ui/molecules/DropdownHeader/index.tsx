import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const DropdownHeader = ({ children }) => (
  <S.Wrapper>
    <div>{children}</div>
    <S.Content>
      <Icons.ArrowBottom />
    </S.Content>
  </S.Wrapper>
);
