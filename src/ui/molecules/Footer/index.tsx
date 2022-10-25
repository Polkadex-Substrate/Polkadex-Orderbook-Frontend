import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectRangerIsConnecting, selectRangerIsReady } from "@polkadex/orderbook-modules";

export const Footer = () => {
  const isConnecting = useReduxSelector(selectRangerIsConnecting);
  const isConnected = useReduxSelector(selectRangerIsReady);

  const message = isConnected ? "Connected" : "Disconnected";
  const color = isConnected ? "green" : "primary";

  return (
    <S.Wrapper>
      <div />
      <S.Container color={isConnecting ? "orange" : color}>
        <Icons.Connection />
        <span>{isConnecting ? "Connecting" : message}</span>
      </S.Container>
    </S.Wrapper>
  );
};
