"use client";

import {
  Button,
  Intro,
  Popover,
  StepType,
  Tooltip,
  Typography,
  useTour,
} from "@polkadex/ux";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import Link from "next/link";
import {
  TradeAccountType,
  useConnectWalletProvider,
} from "@orderbook/core/providers/user/connectWalletProvider";
import { useWindowSize } from "react-use";
import {
  RiBookReadLine,
  RiMenuLine,
  RiNotification3Line,
  RiWalletLine,
} from "@remixicon/react";
import { INTRO } from "@orderbook/core/constants";
import classNames from "classnames";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Controls } from "../../Temp/controls";

import { Trigger } from "./trigger";
import { Content } from "./content";

import Badge from "@/components/ui/Temp/badge";

export const Profile = ({
  onClick,
  onOpenMenu,
  onOpenNotifications,
  onOpenFundWallet,
  unreadNotifications,
}: {
  onClick: () => void;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  onOpenFundWallet: () => void;
  showFundingWallet: boolean;
  unreadNotifications: number;
}) => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();
  const {
    selectedWallet,
    browserAccountPresent,
    extensionAccountPresent,
    selectedTradingAccount,
  } = useConnectWalletProvider();
  const { connectExtension } = useSettingsProvider();

  const responsiveView = useMemo(() => width > 640, [width]);

  const steps: StepType[] = [
    {
      selector: "#accountSelect",
      position: "bottom",
      disableActions: true,
      content: (
        <Intro.Card showControls={false}>
          <div className="flex flex-col gap-3">
            <Intro.Title>🚀 Use Your Extension Wallet for Trading</Intro.Title>
            <Typography.Text appearance="primary">
              Yes! We&lsquo;ve heard you, now it is possible to use your
              extension account for trading. Let&apos;s start?
            </Typography.Text>
          </div>
          <Controls
            localStorageName={INTRO.connectedWallet}
            onNextCb={() => setOpen(true)}
          />
        </Intro.Card>
      ),
    },
    {
      selector: "#optionSelect",
      disableActions: true,
      content: (
        <Intro.Card showControls={false}>
          <div className="flex flex-col gap-3">
            <Intro.Title>Register your funding account</Intro.Title>
            <Typography.Text appearance="primary">
              Simple and easy. Just make sure you have some PDEX to cover the
              fee.
            </Typography.Text>
          </div>
          <Controls
            localStorageName={INTRO.connectedWallet}
            onPrevCb={() => setOpen(false)}
          />
        </Intro.Card>
      ),
    },
  ];

  // TEMP
  const defaultOpen = useMemo(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem(INTRO.connectedWallet) === "true";
    return false;
  }, []);

  if (browserAccountPresent || extensionAccountPresent)
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button.Solid size="2sm" onClick={onOpenFundWallet}>
            Fund Account
          </Button.Solid>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Link href="/balances">
                <Button.Icon className="max-sm:p-0">
                  <RiWalletLine className="h-full w-full" />
                </Button.Icon>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>Balances</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Link href="/history">
                <Button.Icon className="max-sm:p-0">
                  <RiBookReadLine className="h-full w-full" />
                </Button.Icon>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>History</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon className="relative" onClick={onOpenNotifications}>
                <RiNotification3Line className="h-full w-full" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                    {unreadNotifications > 9 ? `9+` : `${unreadNotifications}`}
                  </Badge>
                )}
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Notifications</Tooltip.Content>
          </Tooltip>
        </div>
        {responsiveView && (
          <Intro
            localStorageName={INTRO.connectedWallet}
            steps={steps}
            defaultOpen={!defaultOpen && !connectExtension}
          >
            <CustomPopover
              open={open}
              setOpen={setOpen}
              extensionAccountPresent={extensionAccountPresent}
              walletName={selectedWallet?.name}
              tradingAccountName={selectedTradingAccount?.account?.meta.name}
              browserAccountPresent={
                !!(
                  selectedTradingAccount &&
                  selectedTradingAccount?.type === TradeAccountType.Keyring
                )
              }
            />
          </Intro>
        )}

        <Button.Icon variant="ghost" onClick={onOpenMenu}>
          <RiMenuLine className="h-full w-full" />
        </Button.Icon>
      </div>
    );

  return (
    <div data-tour={INTRO.newUser.steps[0]} className="flex items-center gap-2">
      <Button.Solid size="2sm" className="font-medium" onClick={onClick}>
        Connect wallet
      </Button.Solid>
      <Button.Icon variant="ghost" onClick={onOpenMenu}>
        <RiMenuLine className="h-full w-full" />
      </Button.Icon>
    </div>
  );
};

const CustomPopover = ({
  open,
  setOpen,
  extensionAccountPresent,
  walletName = "",
  tradingAccountName = "",
  browserAccountPresent,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  extensionAccountPresent: boolean;
  walletName?: string;
  tradingAccountName?: string;
  browserAccountPresent: boolean;
}) => {
  const { isOpen } = useTour();
  return (
    <Popover open={open} onOpenChange={isOpen ? undefined : setOpen}>
      <Popover.Trigger superpositionTrigger={!isOpen}>
        <Trigger
          extensionAccountPresent={extensionAccountPresent}
          extensionAccountName={walletName}
          browserAccountName={tradingAccountName}
          browserAccountPresent={browserAccountPresent}
        />
      </Popover.Trigger>
      <Popover.Content
        withArrow
        className={classNames(isOpen ? "z-[1]" : "z-[15]")}
      >
        <Content defaultActive={isOpen} defaultIndex={isOpen ? 4 : 0} />
      </Popover.Content>
    </Popover>
  );
};
