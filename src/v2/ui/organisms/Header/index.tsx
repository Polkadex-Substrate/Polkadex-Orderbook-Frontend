import * as S from "./styles";

import { SpaceBetweenCenter } from "@orderbook-ui/v2/atoms";
import { MyAccount, Notifications, Menu } from "@orderbook-ui/v2/molecules";
import { Polkadex } from "@polkadex/orderbook-ui/molecules";

export const Header = () => {
  return (
    <S.Main>
      <SpaceBetweenCenter>
        <S.AsideLeft>
          <Polkadex />
          <div>Search</div>
        </S.AsideLeft>
        <S.AsideRight>
          <Menu />
          <Notifications />
          <MyAccount />
        </S.AsideRight>
      </SpaceBetweenCenter>
    </S.Main>
  );
};
