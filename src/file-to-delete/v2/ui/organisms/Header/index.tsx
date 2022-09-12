import { useRouter } from "next/router";

import { QuickLogin } from "../../molecules/QuickLogin";

import * as S from "./styles";

import { Menu } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/Menu";
import { MyWallet } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/MyWallet";
import { SpaceBetweenCenter } from "@polkadex/orderbook/file-to-delete/v2/ui/atoms";
import { MyAccount, Search } from "@orderbook/v2/ui/molecules";
import { AvailableMessage, Button, Logo } from "@polkadex/orderbook-ui/molecules";
import { selectHasCurrentTradeAccount } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const Header = () => {
  const hasUser = useReduxSelector(selectHasCurrentTradeAccount);
  const router = useRouter();

  return (
    <S.Main>
      <SpaceBetweenCenter>
        <S.AsideLeft>
          <Logo />
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
