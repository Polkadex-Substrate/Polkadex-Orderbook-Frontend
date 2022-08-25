import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import * as S from "./styles";
import * as T from "./types";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { Appearance, AccountOverview } from "@orderbook/v2/ui/molecules";
import { useAccount, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  logOutFetch,
  selectCurrentTradeAccount,
  selectHasCurrentTradeAccount,
  userFetch,
} from "@polkadex/orderbook-modules";

export const MyAccount = () => {
  const { userEmail } = useAccount();

  return (
    <S.Main>
      <Dropdown
        header={<Header address={userEmail} accountName={userEmail} />}
        direction="bottomRight"
        priority="medium"
        style={{ overflow: "hidden" }}>
        <WalletContent />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({
  balance = "0.000000",
  address,
  accountName,
  isFull = false,
  ...props
}: T.Props) => {
  const shortAddress = address
    ? address.slice(0, 3) + ".." + address.slice(address.length - 3)
    : "";

  return (
    <S.Header isFull={isFull} {...props}>
      <Icon name="Avatar" background="secondaryBackground" color="text" size="extraLarge" />
      <S.HeaderContainer>
        <S.HeaderInfo>
          <p>{`${accountName} (${shortAddress})`}</p>
          <span>Estimated: {balance}</span>
        </S.HeaderInfo>
      </S.HeaderContainer>
    </S.Header>
  );
};

export const WalletContent = () => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);
  const currentTradeAddr = useReduxSelector(selectCurrentTradeAccount).address;
  const userHasSelectedProxyAccount = useReduxSelector(selectHasCurrentTradeAccount);

  const { isSignedIn } = useAccount();
  const dispatch = useDispatch();

  const address = currentTradeAddr;

  const calculateHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const onNavigate = (value = "Main") => setActiveMenu(value);

  return (
    <S.Content style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "Main"}
        unmountOnExit={true}
        timeout={400}
        classNames="menu-primary"
        onEnter={calculateHeight}>
        {isSignedIn && userHasSelectedProxyAccount ? (
          <AccountOverview
            address={address || "0x000000000"}
            logout={() => dispatch(logOutFetch())}
            onNavigate={onNavigate}
          />
        ) : (
          <S.Empty>
            <S.EmptyHeader>
              <figure>
                <img
                  src="/img/loginEmpty.svg"
                  alt="Hand coming out of a smartphone with a pen in hand"
                />
              </figure>
            </S.EmptyHeader>
            <S.EmptyContent>
              <h2>Oops, it seems that you are not logged in</h2>
              <p>Explore a new way to trade with your own wallet!</p>
              <S.EmptyActions>
                <Link href="/sign">Sign Up</Link>
                <Link href="/signIn">Login</Link>
                <div />
              </S.EmptyActions>
            </S.EmptyContent>
          </S.Empty>
        )}
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "Appearance"}
        unmountOnExit={true}
        timeout={400}
        classNames="menu-secondary"
        onEnter={calculateHeight}>
        <Appearance navigateBack={() => onNavigate("Main")} />
      </CSSTransition>
    </S.Content>
  );
};
