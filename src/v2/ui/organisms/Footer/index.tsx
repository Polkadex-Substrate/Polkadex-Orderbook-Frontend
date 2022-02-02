import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const Footer = () => {
  return (
    <S.Main>
      <AvailableMessage message="Soon">
        <S.Connection>
          <span>
            <Icon name="Connection" size="extraSmall" />
            Stable Connection
          </span>
        </S.Connection>
      </AvailableMessage>
      <AvailableMessage message="Soon">
        <S.Developer>
          <span>
            <Icon name="Settings" size="extraSmall" />
            Developer Options
          </span>
        </S.Developer>
      </AvailableMessage>
    </S.Main>
  );
};
