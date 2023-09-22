import { Icon } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";
import * as T from "./types";

export const Search = ({
  isFull = false,
  hasBorder = true,
  ...props
}: T.Props) => (
  <S.Wrapper hasBorder={hasBorder} isFull={isFull}>
    <button>
      <Icon name="Search" size="extraSmall" stroke="text" color="text" />
    </button>
    <input type="text" {...props} />
  </S.Wrapper>
);
