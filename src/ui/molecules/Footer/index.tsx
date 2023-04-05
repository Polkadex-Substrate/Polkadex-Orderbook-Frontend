import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export const Footer = () => {
  const nativeApiState = useNativeApi();
  const isConnecting = nativeApiState.connecting;
  const isConnected = nativeApiState.connected;

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
