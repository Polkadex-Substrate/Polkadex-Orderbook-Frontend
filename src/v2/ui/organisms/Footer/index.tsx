import { DeveloperHeader, DeveloperContent } from "..";

import * as S from "./styles";

import { AvailableMessage, Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

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
      <Dropdown header={<DeveloperHeader />} direction="topRight" priority="high">
        <DeveloperContent />
      </Dropdown>
    </S.Main>
  );
};
