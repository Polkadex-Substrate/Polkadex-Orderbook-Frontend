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
              <div>
                <S.Span>Exchange</S.Span>
              </div>
            </S.WrapperIcon>
          </Link>
          <Link href="/balances">
            <S.WrapperIcon>
              <div>
                <Icon name="Coins" background="none" stroke="text" size="large" />
              </div>
              <div>
                <S.Span>Balances</S.Span>
              </div>
            </S.WrapperIcon>
          </Link>
          <Link href="/settings">
            <S.WrapperIcon>
              <div>
                <Icon name="Wallet" background="none" stroke="text" size="large" />
              </div>
              <div>
                <S.Span>Accounts</S.Span>
              </div>
            </S.WrapperIcon>
          </Link>
          <Terms />
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
  const [state, setState] = useState(false);
  return (
    <S.Terms>
      <span role="button" onClick={() => setState(!state)}>
        <S.WrapperIcon>
          <div>
            <Icon name="Book" background="none" stroke="text" size="large" />
          </div>
          <div>
            <S.Span>Legal links</S.Span>
          </div>
        </S.WrapperIcon>
      </span>
      {state && (
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Terms of Use</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Privacy Policy</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Disclaimer</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Excluded Jurisdictions</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Data_Retention_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>Data Retention Policy</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
        </S.TermsLinks>
      )}
    </S.Terms>
  );
};
export default Menu;
