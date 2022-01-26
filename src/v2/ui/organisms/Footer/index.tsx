import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Footer = () => {
  return (
    <S.Main>
      <S.Connection>
        <span>
          <Icon name="Connection" size="extraSmall" />
          Stable Connection
        </span>
      </S.Connection>
      <S.Developer>
        <span>
          <Icon name="Settings" size="extraSmall" />
          Developer Options
        </span>
      </S.Developer>
    </S.Main>
  );
};
