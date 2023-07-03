import { ReactNode, isValidElement, useMemo } from "react";
import Link from "next/link";

import * as S from "./styles";

import {
  Dropdown,
  Icon,
  NotificationsContent,
  PolkadexLogo,
  Popover,
  Profile,
} from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { selectNotifications } from "@polkadex/orderbook/providers/public/settings/helpers";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { getTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { transformAddress } from "@polkadex/orderbook/providers/user/profile/helpers";

const languages = ["en", "fr", "es", "zh"];
type Languages = "en" | "fr" | "es" | "zh";

export const Header = ({ children }: { children?: ReactNode }) => {
  const { notifications, language, onChangeLanguage } = useSettingsProvider();
  const allNotifications = selectNotifications(notifications);
  const { allBrowserAccounts } = useTradeWallet();

  const tradingAccounts = allBrowserAccounts;
  const {
    authInfo: { isAuthenticated },
    selectedAccount,
  } = useProfile();

  const tradeAccountInfo = useMemo(
    () => getTradeAccount(selectedAccount.tradeAddress, tradingAccounts),
    [selectedAccount.tradeAddress, tradingAccounts]
  );

  const walletName = tradeAccountInfo?.meta?.name as string;
  const addressName =
    tradeAccountInfo &&
    ` • ${tradeAccountInfo ? transformAddress(tradeAccountInfo.address, 5) : ""}`;

  const isValidChild = isValidElement(children);
  return (
    <S.Wrapper>
      <S.Content>
        <S.Logo borderActive={isValidChild} hideLogo>
          <PolkadexLogo />
        </S.Logo>
        <S.ContentFull>{children}</S.ContentFull>
      </S.Content>
      <S.Actions>
        <S.ActionsWrapper>
          <Dropdown>
            <Dropdown.Trigger>
              <S.Flex>
                <span>{language.toUpperCase()}</span>
                <Icon name="ArrowBottom" />
              </S.Flex>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="secondaryBackgroundSolid">
              {languages.map((value: Languages) => (
                <Dropdown.Item onAction={() => onChangeLanguage(value)} key={value}>
                  {value.toUpperCase()}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </S.ActionsWrapper>
        <S.ActionsWrapper>
          <Popover>
            <Popover.Trigger>
              <S.NotificationsActive
                isActive={!!notifications?.find((value) => !value.active)}>
                <Icons.Notifications />
                <div />
              </S.NotificationsActive>
            </Popover.Trigger>
            <Popover.Content>
              <NotificationsContent notifications={allNotifications} />
            </Popover.Content>
          </Popover>
        </S.ActionsWrapper>
        <S.AccountContainer>
          {isAuthenticated ? (
            <Popover>
              <Popover.Trigger>
                <S.Account>
                  <S.Avatar>
                    <Icons.Avatar />
                  </S.Avatar>
                  <S.AccountInfo>
                    {tradeAccountInfo ? (
                      <p>
                        {walletName}
                        <span>{addressName}</span>
                      </p>
                    ) : (
                      <p>No trade wallet selected</p>
                    )}
                  </S.AccountInfo>
                  <S.AccountMessage>Account</S.AccountMessage>
                </S.Account>
              </Popover.Trigger>
              <Popover.Content>
                <Profile />
              </Popover.Content>
            </Popover>
          ) : (
            <S.UserActions>
              <Link href="/signIn">Log In</Link>
              <Link href="/sign">Register</Link>
            </S.UserActions>
          )}
        </S.AccountContainer>
      </S.Actions>
    </S.Wrapper>
  );
};
