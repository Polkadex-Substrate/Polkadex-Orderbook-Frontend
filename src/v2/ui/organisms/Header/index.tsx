import { useRouter } from "next/router";

import * as S from "./styles";

import { SpaceBetweenCenter } from "@orderbook/v2/ui/atoms";
import {
  MyAccount,
  Notifications,
  Menu,
  Search,
  QuickLogin,
} from "@orderbook/v2/ui/molecules";
import { Button, Polkadex } from "@polkadex/orderbook-ui/molecules";
import { selectHasUser } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const Header = () => {
  const hasUser = useReduxSelector(selectHasUser);
  const router = useRouter();

  return (
    <S.Main>
      <SpaceBetweenCenter>
        <S.AsideLeft>
          <Polkadex />
          <Search />
        </S.AsideLeft>
        <S.AsideRight>
          <Menu />
          {hasUser ? (
            <>
              <Notifications />
              <MyAccount />
            </>
          ) : (
            <S.Box>
              <Button
                onClick={() => router.push("/login")}
                color="white"
                icon={{
                  name: "Wallet",
                  background: "black",
                  color: "white",
                  size: "extraMedium",
                  stroke: "text",
                }}>
                Login/Sign Up
              </Button>
              <QuickLogin />
            </S.Box>
          )}
        </S.AsideRight>
      </SpaceBetweenCenter>
    </S.Main>
  );
};
