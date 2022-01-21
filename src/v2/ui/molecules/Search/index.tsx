import { useState } from "react";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Search = () => {
  const [active, setActive] = useState(false);
  return (
    <S.Main isActive={active}>
      <S.Header>
        <S.Actions onClick={() => setActive(false)}>
          <Icon name="SingleArrowLeft" size="extraSmall" color="inverse" />
        </S.Actions>
        <S.Search onClick={() => setActive(true)}>
          <Icon name="Search" size="extraSmall" />
          <input type="text" placeholder="Search Menu.." />
        </S.Search>
      </S.Header>
      <S.Content>
        <S.Title>
          <h4>Recent Searches</h4>
          <button>Clear</button>
        </S.Title>
        <S.Container>
          <S.Card>
            <span>
              <Icon name="Clock" size="extraSmall" />
              Polkadex
            </span>
            <S.CardActions>
              <Icon name="Close" color="inverse" />
            </S.CardActions>
          </S.Card>
        </S.Container>
      </S.Content>
      <S.Overlay aria-hidden={!active} onClick={() => setActive(false)} />
    </S.Main>
  );
};
