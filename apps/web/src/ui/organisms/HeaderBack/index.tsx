import { useRouter } from "next/router";
import { Icon, Logo } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

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
