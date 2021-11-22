import { useRouter } from "next/router";
import Link from "next/link";

import * as S from "./styles";

import { Icon, Button, Dropdown, Polkadex } from "@polkadex/orderbook-ui/molecules";
import { ThemeSwitch, Toolbar, MyAccountContent, MyAccountHeader } from "src/ui";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { selectUserInfo } from "@polkadex/orderbook-modules";

export const Header = () => {
  const user = useReduxSelector(selectUserInfo);
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <S.Wrapper>
      <S.Container>
        <S.Column>
          <Link href="/">
            <a>
              <Polkadex />
            </a>
          </Link>
          {width >= 920 && <Toolbar />}
        </S.Column>
        <S.Column>
          <ThemeSwitch />
          {user.address ? (
            <Dropdown
              isOpacity
              direction="centerRight"
              header={
                <MyAccountHeader accountName={user.accountName} address={user.address} />
              }>
              <MyAccountContent accountName={user.accountName} address={user.address} />
            </Dropdown>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              icon={{
                name: "Wallet",
                background: "primaryBackground",
                size: "extraMedium",
              }}>
              Login/Sign Up
            </Button>
          )}
        </S.Column>
      </S.Container>
    </S.Wrapper>
  );
};

export const HeaderBack = () => {
  const router = useRouter();
  return (
    <S.HeaderBack onClick={() => router.push("/")}>
      <Icon size="large" name="Return" background="none" />
      <Polkadex />
    </S.HeaderBack>
  );
};
