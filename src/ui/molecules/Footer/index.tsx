import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export const Footer = () => {
  const nativeApiState = useNativeApi();
  const isConnecting = nativeApiState.connecting;
  const isConnected = nativeApiState.connected;

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`footer.${key}`);

  const message = isConnected ? t("connected") : t("disconnected");
  const color = isConnected ? "green" : "primary";

  return (
    <S.Wrapper>
      <div />
      <S.Container color={isConnecting ? "orange" : color}>
        <Icons.Connection />
        <span>{isConnecting ? t("connecting") : message}</span>
      </S.Container>
    </S.Wrapper>
  );
};
