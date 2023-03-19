import { HTMLAttributes, useState } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { Skeleton, Icon, Appearance, AccountOverview, EmptyMyAccount } from "../";

import * as S from "./styles";
import * as T from "./types";

import { useAccount } from "@polkadex/orderbook-hooks";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";

export const SelectAccount = ({
  address,
  isActive,
  fullDescription,
  isHeader,
  accountName,
  withButton,
  locked = false,
  isFull = true,
  iconColor = "white",
  iconBackground = "black",
  isHoverable = true,
  ...props
}: T.SelectAccountProps & HTMLAttributes<HTMLDivElement>) => {
  const shortAddress =
    address && address?.length >= 40
      ? address.slice(0, 8) + "..." + address.slice(address.length - 8)
      : address;

  return (
    <S.SelectAccountWrapper isFull={isFull}>
      <S.SelectAccount
        isActive={isActive}
        isHeader={isHeader}
        isHoverable={isHoverable}
        {...props}>
        <Icon
          size={isHeader ? "extraGiant" : "giant"}
          name="Avatar"
          color={iconColor}
          background={iconBackground}
        />
        <S.AccountInfo>
          <S.SelectAccountHeader>
            <S.SelectAccountHeaderWrapper>
              <S.SelectAccountTitle>
                {locked && <Icon name="Lock" stroke="secondaryBackgroundDark" />}
                <p>{accountName}</p>
              </S.SelectAccountTitle>
              <S.SelectAccountFlex>
                <span>{fullDescription ? address : shortAddress}</span>
                {isHeader && <Icon name="ArrowBottom" stroke="black" />}
              </S.SelectAccountFlex>
            </S.SelectAccountHeaderWrapper>
            {withButton && (
              <Icon name="ArrowBottom" size="small" style={{ marginLeft: "1rem" }} />
            )}
          </S.SelectAccountHeader>
        </S.AccountInfo>
      </S.SelectAccount>
    </S.SelectAccountWrapper>
  );
};
export const MyAccountLoading = () => (
  <div>
    <MyAccountLoadingContent />
    <MyAccountLoadingContent />
  </div>
);

const MyAccountLoadingContent = () => (
  <S.SelectAccountWrapper>
    <S.SelectAccount>
      <Skeleton isLight height="4rem" width="4rem" style={{ marginRight: 10 }} />
      <div>
        <Skeleton isLight width="12rem" />
        <Skeleton isLight width="12rem" style={{ marginTop: "1rem" }} />
      </div>
    </S.SelectAccount>
  </S.SelectAccountWrapper>
);

export const WalletContent = () => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);
  const profileState = useProfile();
  const { onLogout } = useAuth();
  const currentTradeAddr = profileState.selectedAccount.tradeAddress;

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
