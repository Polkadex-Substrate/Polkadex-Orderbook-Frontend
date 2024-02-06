"use client";

import { Fragment, forwardRef, useState } from "react";
import Link from "next/link";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Logo } from "@polkadex/ux";

import { ConnectWalletInteraction } from "../ConnectWalletInteraction";

import { HeaderLink } from "./headerLink";
import { Profile } from "./Profile";
import { ResponsiveMenuModal } from "./responsiveMenuModal";
import { NotificationsModal } from "./NotificationsModal";
import { FundWalletModal } from "./FundWalletModal";
export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [fundWallet, setFundWallet] = useState(false);
  const { connectExtension, onToogleConnectExtension } = useSettingsProvider();

  return (
    <Fragment>
      <ResponsiveMenuModal open={menu} onOpenChange={setMenu} />
      <ConnectWalletInteraction />
      <NotificationsModal
        open={notifications}
        onOpenChange={setNotifications}
      />
      <FundWalletModal open={fundWallet} onOpenChange={setFundWallet} />
      <header
        ref={ref}
        className="flex justify-between items-center px-3 flex-wrap border-b border-primary"
      >
        <div className="flex-1 flex items-center gap-5 py-2">
          <Link
            href="/trading"
            className="md:flex-1 md:max-w-[140px] max-md:w-8 max-md:h-8 max-md:overflow-hidden"
          >
            <Logo.Orderbook className="max-md:pointer-events-none max-md:h-8 max-md:[&_g]:hidden" />
          </Link>
          <div className="gap-5 hidden items-center lg:flex">
            <HeaderLink.Single href="/trading">Trade</HeaderLink.Single>
            <HeaderLink.Single href="/markets">Markets</HeaderLink.Single>
            <HeaderLink.Single href="/analytics">Analytics</HeaderLink.Single>
            <HeaderLink.Dropdown
              items={[
                { href: "/", label: "Community support" },
                { href: "/", label: "Orderbook guide" },
                { href: "/", label: "FAQ" },
              ]}
            >
              Support
            </HeaderLink.Dropdown>
            <HeaderLink.Dropdown
              items={[
                { href: "/", label: "Terms of use" },
                { href: "/", label: "Privacy policy" },
                { href: "/", label: "Disclaimer" },
                { href: "/", label: "Excluded Jurisdictions" },
                { href: "/", label: "Data Retention Policy" },
              ]}
            >
              More
            </HeaderLink.Dropdown>
          </div>
        </div>
        <Profile
          showFundingWallet
          onClick={() => onToogleConnectExtension(!connectExtension)}
          onOpenMenu={() => setMenu(true)}
          onOpenNotifications={() => setNotifications(true)}
          onOpenFundWallet={() => setFundWallet(true)}
        />
      </header>
    </Fragment>
  );
});

Header.displayName = "Header";
