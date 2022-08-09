import { useRouter } from "next/router";

import * as S from "./styles";

import { SpaceBetweenCenter } from "@orderbook/v2/ui/atoms";
import { MyAccount, MyWallet, Menu, Search, QuickLogin } from "@orderbook/v2/ui/molecules";
import { AvailableMessage, Button, Polkadex } from "@polkadex/orderbook-ui/molecules";
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
          <AvailableMessage message="Soon" isPriority>
            <Menu />
          </AvailableMessage>
          {hasUser ? (
            <>
              <MyWallet />
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
                  size: "extraMedium",
                  stroke: "white",
                }}>
                Login/Sign Up
              </Button>
              <QuickLogin
                label="Quick Access"
                title="Log in with QR Code"
                description="Scan this QR Code with the Polkadex mobile app to log in instantly."
                qrCodeValue={"test1, test2, test3"}
                background="inverse"
              />
            </S.Box>
          )}
        </S.AsideRight>
      </SpaceBetweenCenter>
    </S.Main>
  );
};
