// TODO: Fix Bighead typing
import Link from "next/link";
import { BigHead } from "@bigheads/core";
import { useState } from "react";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  Icon,
  Logo,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  Profile,
  Popover,
  NotificationsContent,
} from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/hooks";
import { selectNotifications } from "@polkadex/orderbook/providers/public/settings/helpers";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const Menu = () => {
  const router = useRouter();

  const profileState = useProfile();
  const { isDarkTheme, changeTheme } = useAppearance();
  const settingsState = useSettingsProvider();
  const notifications = selectNotifications(settingsState.notifications);
  const avatarOptions = randomAvatars?.find(
    (v) => v.id === Number(profileState.userProfile?.avatar)
  );

  const {
    authInfo: { isAuthenticated },
  } = profileState;

  return (
    <S.Main>
      <S.Wrapper>
        <S.WrapperLinks>
          <S.Logo>
            <Logo size="Medium" href="/trading" />
          </S.Logo>
          <S.Container>
            <S.WrapperIcon isDisabled={router.pathname === "/trading/[id]"}>
              <Link href="/trading">
                <div>
                  <Icon name="Exchange" background="none" stroke="text" size="large" />
                </div>
                <S.Span>Exchange</S.Span>
              </Link>
            </S.WrapperIcon>
            <S.WrapperIcon isDisabled={!isAuthenticated || router.pathname === "/balances"}>
              <Link href="/balances">
                <div>
                  <Icon name="Coins" background="none" stroke="text" size="large" />
                </div>
                <S.Span>Balances</S.Span>
              </Link>
            </S.WrapperIcon>
            <S.WrapperIcon isDisabled={!isAuthenticated || router.pathname === "/settings"}>
              <Link href="/settings">
                <div>
                  <Icon name="Wallet" background="none" stroke="text" size="large" />
                </div>
                <S.Span>Accounts</S.Span>
              </Link>
            </S.WrapperIcon>
            <Terms />
            <Help />
          </S.Container>
          <S.WrapperIcon onClick={changeTheme} as="div">
            <Tooltip>
              <TooltipHeader>
                <div>
                  <Icon
                    name={isDarkTheme ? "Sun" : "Moon"}
                    background="secondaryBackground"
                    size="large"
                  />
                </div>
              </TooltipHeader>
              <TooltipContent position="left">
                <S.Span>{isDarkTheme ? "Light" : "Dark"}</S.Span>
              </TooltipContent>
            </Tooltip>
          </S.WrapperIcon>
        </S.WrapperLinks>
        <S.WrapperProfile>
          <S.ContainerProfile>
            <Popover>
              <Popover.Trigger>
                <S.Notifications>
                  <Tooltip>
                    <TooltipHeader>
                      <S.NotificationsWrapper
                        isActive={!!notifications?.find((value) => !value.active)}>
                        <Icons.Notifications />
                        <div />
                      </S.NotificationsWrapper>
                    </TooltipHeader>
                    <TooltipContent position="left">
                      <p style={{ whiteSpace: "nowrap" }}>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </S.Notifications>
              </Popover.Trigger>
              <Popover.Content>
                <NotificationsContent notifications={notifications} />
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger>
                <S.Profile>
                  <Tooltip>
                    <TooltipHeader>
                      <S.Avatar>
                        <BigHead {...avatarOptions.data} />
                      </S.Avatar>
                    </TooltipHeader>
                    <TooltipContent position="left">
                      <p style={{ whiteSpace: "nowrap" }}>My Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </S.Profile>
              </Popover.Trigger>
              <Popover.Content>
                <Profile />
              </Popover.Content>
            </Popover>
          </S.ContainerProfile>
        </S.WrapperProfile>
      </S.Wrapper>
      <div></div>
    </S.Main>
  );
};

const Terms = () => {
  return (
    <S.Terms>
      <S.WrapperIcon>
        <div>
          <Icon name="Book" background="none" stroke="text" size="large" />
        </div>
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>Terms of Use</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>Privacy Policy</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>Disclaimer</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>Excluded Jurisdictions</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Data_Retention_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>Data Retention Policy</span>
            </div>
          </a>
        </S.TermsLinks>
      </S.WrapperIcon>
    </S.Terms>
  );
};

const Help = () => {
  const [state, setState] = useState(false);
  return (
    <S.Terms>
      <span role="button" onClick={() => setState(!state)}>
        <S.WrapperIcon>
          <div>
            <Icon name="Question" background="none" stroke="text" size="large" />
          </div>
          <div>
            <S.Span>Help</S.Span>
          </div>
        </S.WrapperIcon>
      </span>
      {state && (
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Orderbook_FAQ.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>FAQ</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a href="https://discord.gg/G4KMw2sGGe" target="_blank" rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Discord</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
        </S.TermsLinks>
      )}
    </S.Terms>
  );
};

export default Menu;
