import * as S from "./styles";

import { SpaceBetweenCenter } from "@orderbook-ui/v2/atoms";
import { MyAccount, Notifications } from "@orderbook-ui/v2/molecules";
import { Polkadex, Icon } from "@polkadex/orderbook-ui/molecules";

export const Header = () => {
  return (
    <S.Main>
      <SpaceBetweenCenter>
        <S.AsideLeft>
          <Polkadex />
          <div>Search</div>
        </S.AsideLeft>
        <S.AsideRight>
          <S.Menu>
            <Icon name="Menu" color="inverse" size="extraSmall" />
            Menu
          </S.Menu>
          <Notifications />
          <MyAccount />
        </S.AsideRight>
      </SpaceBetweenCenter>
    </S.Main>
  );
};
