import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import * as T from "./types";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { Appearance, AccountOverview } from "@orderbook/v2/ui/molecules";
import { useAccount, useReduxSelector } from "@polkadex/orderbook-hooks";
import { logOutFetch, selectUserInfo } from "@polkadex/orderbook-modules";

export const MyAccount = () => {
  const { userAddress, userName } = useAccount();

  return (
    <S.Main>
      <Dropdown
        header={<Header address={userAddress} accountName={userName} />}
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
  const dispatch = useDispatch();
  const { address } = useReduxSelector(selectUserInfo);

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
        <AccountOverview
          address={address || "0x000000000"}
          logout={() => dispatch(logOutFetch())}
          onNavigate={onNavigate}
        />
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
