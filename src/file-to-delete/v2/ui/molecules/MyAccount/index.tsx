import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import * as S from "./styles";

import { Appearance, AccountOverview } from "@polkadex/orderbook-ui/molecules";
import { useAccount, useReduxSelector } from "@polkadex/orderbook-hooks";
import { logOutFetch, selectUsingAccount } from "@polkadex/orderbook-modules";

export const WalletContent = () => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);
  const currentTradeAddr = useReduxSelector(selectUsingAccount).selectedTradeAddress;

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
        {isSignedIn ? (
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
              <h2>Looks like you&apos;re not logged in</h2>
              <p>Explore a new way of trading with your own wallet!</p>
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
