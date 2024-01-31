import { PolkadexIcon } from "@polkadex/orderbook-ui/molecules";
import { PropsWithChildren } from "react";

import * as S from "./styles";

export const TwitterMessage = ({
  children,
  username,
  name,
}: PropsWithChildren<{
  username: string;
  name: string;
}>) => {
  return (
    <S.Wrapper>
      <S.Title>
        <div>
          <PolkadexIcon />
        </div>
        <h4>
          {name} <span>{username}</span>
        </h4>
      </S.Title>
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
};
