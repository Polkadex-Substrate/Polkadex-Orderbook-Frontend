import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Icon,
  Button,
  Dropdown,
  Polkadex,
  ThemeSwitch,
  MyAccountHeader,
  MyAccountContent,
} from "@polkadex/orderbook-ui/molecules";
import { Toolbar } from "@polkadex/orderbook-ui/organisms";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { logOutFetch } from "@polkadex/orderbook-modules";

export const Header = ({ withInfo = true }) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <S.Container>
        <S.Column>
          <Link href="/">
            <a>
              <Polkadex />
            </a>
          </Link>
          {withInfo && width >= 1050 && <Toolbar />}
        </S.Column>
        <S.Column>
          <ThemeSwitch />
          {true ? (
            <Dropdown
              isOpacity
              direction="centerRight"
              header={<MyAccountHeader accountName={"Fix this"} address={"Fix this"} />}>
              <MyAccountContent
                accountName={"Fix this"}
                address={"fix this"}
                onClick={() => dispatch(logOutFetch())}
              />
            </Dropdown>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              icon={{
                name: "Wallet",
                background: "primaryBackground",
                size: "extraMedium",
                stroke: "text",
              }}>
              Login/Sign Up
            </Button>
          )}
        </S.Column>
      </S.Container>
    </S.Wrapper>
  );
};

export const HeaderBack = ({ hasArrow = true }) => {
  const router = useRouter();
  return (
    <S.HeaderBack>
      <S.HeaderBackContainer onClick={() => router.push("/")}>
        {hasArrow && <Icon size="large" name="Return" background="none" />}
        <Polkadex />
      </S.HeaderBackContainer>
    </S.HeaderBack>
  );
};
