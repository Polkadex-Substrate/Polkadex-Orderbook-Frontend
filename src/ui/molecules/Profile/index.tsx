import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { Appearance, AccountOverview, EmptyMyAccount } from "..";

import * as S from "./styles";

import { useAccount } from "@polkadex/orderbook-hooks";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";

export const Profile = () => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);
  const currentTradeAddr = "";
  const { onLogout } = useAuth();

  const { isSignedIn } = useAccount();

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
            logout={() => onLogout()}
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
