import { useState } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { Appearance, AccountOverview, EmptyMyAccount } from "..";

import * as S from "./styles";

import { useAccount, useReduxSelector } from "@polkadex/orderbook-hooks";
import { logOutFetch } from "@polkadex/orderbook-modules";

export const Profile = () => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);
  const currentTradeAddr = "";

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
          <EmptyMyAccount />
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
