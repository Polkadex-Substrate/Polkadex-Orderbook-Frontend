import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export const DropdownHeader = ({ children }) => (
  <S.Wrapper>
    <p>{children}</p>
    <div>
      <Icons.ArrowBottom />
    </div>
  </S.Wrapper>
);
