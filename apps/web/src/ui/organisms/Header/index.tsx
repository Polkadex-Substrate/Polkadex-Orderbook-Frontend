import { ReactNode, isValidElement, useMemo } from "react";
import Link from "next/link";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  Icon,
  NotificationsContent,
  PolkadexLogo,
  Popover,
  Profile,
} from "@polkadex/orderbook-ui/molecules";
import {
  useSettingsProvider,
  selectNotifications,
} from "@orderbook/core/providers/public/settings";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  useProfile,
  transformAddress,
} from "@orderbook/core/providers/user/profile";
import {
  getTradeAccount,
  useTradeWallet,
} from "@orderbook/core/providers/user/tradeWallet";
import { languages as avaliableLanguages } from "@orderbook/core/utils";

import * as S from "./styles";

const languages = avaliableLanguages.map((l) => l.code);
type Languages = "en";

export const Header = ({
  dark = false,
  children,
}: {
  children?: ReactNode;
  dark?: boolean;
}) => {
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
    ` • ${
      tradeAccountInfo ? transformAddress(tradeAccountInfo.address, 5) : ""
    }`;

  const isValidChild = isValidElement(children);

  const handleChangeLanguage = (languageCode: Languages) => {
    i18next.changeLanguage(languageCode);
    onChangeLanguage(languageCode);
  };

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`header.${key}`);

  return (
    <S.Wrapper dark={dark}>
      <S.Content>
        <S.Logo borderActive={isValidChild} hideLogo>
          <Link href="/">
            <PolkadexLogo />
          </Link>
          <span>BETA</span>
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
                <Dropdown.Item
                  onAction={() => handleChangeLanguage(value)}
                  key={value}
                >
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
                isActive={!!notifications?.find((value) => !value.active)}
              >
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
                      <p>{t("noTradeWallet")}</p>
                    )}
                  </S.AccountInfo>
                  <S.AccountMessage>{t("account")}</S.AccountMessage>
                </S.Account>
              </Popover.Trigger>
              <Popover.Content>
                <Profile />
              </Popover.Content>
            </Popover>
          ) : (
            <S.UserActions>
              <Link href="/signIn">{t("login")}</Link>
              <Link href="/sign">{t("register")}</Link>
            </S.UserActions>
          )}
        </S.AccountContainer>
      </S.Actions>
    </S.Wrapper>
  );
};
