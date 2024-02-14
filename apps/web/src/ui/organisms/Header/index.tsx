import { ReactNode, isValidElement } from "react";
import Link from "next/link";
import {
  Dropdown,
  Icon,
  NotificationsContent,
  PolkadexLogo,
  Popover,
} from "@polkadex/orderbook-ui/molecules";
import {
  useSettingsProvider,
  selectNotifications,
} from "@orderbook/core/providers/public/settings";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useRouter } from "next/router";
import {
  Tooltip,
  Typography,
  Icon as PolkadexIcon,
  Button,
} from "@polkadex/ux";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

import * as S from "./styles";
import ConnectWalletButton from "./connect";

export const Header = ({
  dark = false,
  children,
}: {
  children?: ReactNode;
  dark?: boolean;
}) => {
  const { notifications } = useSettingsProvider();
  const allNotifications = selectNotifications(notifications);

  const isValidChild = isValidElement(children);

  const router = useRouter();
  const { locales, locale } = router;

  return (
    <S.Wrapper dark={dark}>
      <S.Content>
        <S.Logo borderActive={isValidChild} hideLogo>
          <a href="/">
            <PolkadexLogo />
          </a>
          <span>BETA</span>
        </S.Logo>
        <S.ContentFull>{children}</S.ContentFull>
      </S.Content>
      <div className="flex items-center justify-end max-md:justify-between gap-2 w-full max-md:px-2 flex-wrap">
        <Tooltip>
          <Tooltip.Trigger className="flex items-center gap-2 bg-info-base/30 rounded p-2 border max-md:flex-1 whitespace-nowrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info-base opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-info-base" />
            </span>
            <Typography.Text size="xs">
              The Polkadex Crowdloan is back!
            </Typography.Text>
          </Tooltip.Trigger>
          <Tooltip.Content className="flex flex-col gap-3 max-w-[250px] bg-level-2 border-secondary p-3">
            <div className="w-full rounded-md bg-level-3">
              <Icons.Hand />
            </div>
            <Typography.Text size="xs">
              Contribute now to <strong> get 3 PDEX per DOT </strong>and help
              Polkadex renew its parachain lease.
            </Typography.Text>
            <Button.Solid size="sm" asChild>
              <Link href="https://polkadex.trade/crowdloans" target="_blank">
                Learn more
              </Link>
            </Button.Solid>
          </Tooltip.Content>
        </Tooltip>
        <S.Actions>
          <S.ActionsWrapper>
            <Dropdown>
              <Dropdown.Trigger>
                <S.Flex>
                  <span>{locale?.toUpperCase()}</span>
                  <Icon name="ArrowBottom" />
                </S.Flex>
              </Dropdown.Trigger>
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                {(locales as string[])?.map((value) => {
                  const { pathname, query, asPath } = router;
                  return (
                    <Dropdown.Item key={value}>
                      <Link
                        href={{ pathname, query }}
                        as={asPath}
                        locale={value}
                      >
                        {value?.toUpperCase()}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
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
            <ConnectWalletButton />
          </S.AccountContainer>
        </S.Actions>
      </div>
    </S.Wrapper>
  );
};
