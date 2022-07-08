import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Search = ({ isFull = false, ...props }: T.Props) => (
  <S.Wrapper isFull={isFull}>
    <button>
      <Icon name="Search" size="extraSmall" stroke="text" color="text" />
    </button>
    <input {...props} />
  </S.Wrapper>
);
