import { useRouter } from "next/router";

import * as S from "./styles";

import { Icon, Logo } from "@polkadex/orderbook-ui/molecules";

export const HeaderBack = ({ hasArrow = true }) => {
  const router = useRouter();
  return (
    <S.HeaderBack>
      <S.HeaderBackContainer onClick={() => router.push("/")}>
        {hasArrow && <Icon size="large" name="Return" background="none" />}
        <Logo />
      </S.HeaderBackContainer>
    </S.HeaderBack>
  );
};
