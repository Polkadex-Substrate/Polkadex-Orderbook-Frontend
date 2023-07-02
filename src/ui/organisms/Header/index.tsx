import { ReactNode, isValidElement } from "react";
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

const languages = ["en", "fr", "es", "zh"];
type Languages = "en" | "fr" | "es" | "zh";

export const Header = ({ children }: { children?: ReactNode }) => {
  const { notifications, language, onChangeLanguage } = useSettingsProvider();
  const allNotifications = selectNotifications(notifications);
  const {
    authInfo: { isAuthenticated },
    selectedAccount,
  } = useProfile();

  const isValidChild = isValidElement(children);
  return (
    <S.Wrapper>
      <S.Content>
        <S.Logo borderActive={isValidChild}>
          <PolkadexLogo />
        </S.Logo>
        <div>{children}</div>
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
                  {selectedAccount.tradeAddress ? (
                    <p>
                      {selectedAccount.tradeAddress}
                      <span> • esp33...JTb5Ej</span>
                    </p>
                  ) : (
                    <p>No trade wallet selected</p>
                  )}
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
