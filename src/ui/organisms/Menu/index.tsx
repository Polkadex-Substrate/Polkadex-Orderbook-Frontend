import Link from "next/link";
import { BigHead } from "@bigheads/core";
import { useState } from "react";

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
import { useAppearance, useReduxSelector } from "@polkadex/orderbook/hooks";
import { selectDefaultAvatarOptions, selectNotifications } from "@polkadex/orderbook-modules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export type MenuProps = {
  handleChange?: () => void;
  isWallet?: boolean;
};

export const Menu = ({ handleChange = undefined, isWallet = true }: MenuProps) => {
  const { isDarkTheme, changeTheme } = useAppearance();
  const notifications = useReduxSelector(selectNotifications);
  const avatarOptions = useReduxSelector(selectDefaultAvatarOptions);

  return (
    <S.Wrapper>
      <S.WrapperLinks>
        <S.Logo>
          <Logo size="Medium" href="/trading" />
        </S.Logo>
        <S.Container>
          {!isWallet && (
            <S.WrapperIcon onClick={handleChange}>
              <div>
                <Icon name="Graph" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Markets</S.Span>
            </S.WrapperIcon>
          )}
          <Link href="/trading">
            <S.WrapperIcon>
              <div>
                <Icon name="Exchange" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Exchange</S.Span>
            </S.WrapperIcon>
          </Link>
          <Link href="/balances">
            <S.WrapperIcon>
              <div>
                <Icon name="Coins" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Balances</S.Span>
            </S.WrapperIcon>
          </Link>
          <Link href="/settings">
            <S.WrapperIcon>
              <div>
                <Icon name="Wallet" background="none" stroke="text" size="large" />
              </div>
              <S.Span>Accounts</S.Span>
            </S.WrapperIcon>
          </Link>
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
                      isActive={!!notifications?.find((value) => !value.isRead)}>
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
                      <BigHead {...avatarOptions} />
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
  return (
    <S.Terms>
      <S.WrapperIcon>
        <div>
          <Icon name="Question" background="none" stroke="text" size="large" />
        </div>
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Orderbook_FAQ.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>FAQ</span>
            </div>
          </a>
          <a href="https://discord.gg/G4KMw2sGGe" target="_blank" rel="noreferrer">
            <div>
              <span>Discord</span>
            </div>
          </a>
        </S.TermsLinks>
      </S.WrapperIcon>
    </S.Terms>
  );
};
export default Menu;
