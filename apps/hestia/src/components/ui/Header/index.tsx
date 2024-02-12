"use client";

import { Fragment, forwardRef, useState } from "react";
import Link from "next/link";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Logo } from "@polkadex/ux";
import { getMarketUrl } from "@orderbook/core/helpers";

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
  const lastUsedMarketUrl = getMarketUrl();

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
            href={"/"}
            className="md:flex-1 md:max-w-[140px] max-md:w-8 max-md:h-8 max-md:overflow-hidden"
          >
            <Logo.Orderbook className="max-md:pointer-events-none max-md:h-8 max-md:[&_g]:hidden" />
          </Link>
          <div className="gap-5 hidden items-center lg:flex">
            <HeaderLink.Single href={lastUsedMarketUrl}>
              Trade
            </HeaderLink.Single>
            <HeaderLink.Single href="/markets">Markets</HeaderLink.Single>
            <HeaderLink.Single href="/analytics">Analytics</HeaderLink.Single>
            <HeaderLink.Dropdown
              items={[
                {
                  href: "https://discord.gg/G4KMw2sGGe",
                  label: "Community support",
                },
                {
                  href: "https://docs.polkadex.trade/orderbookPolkadexFAQHowToTradeStep1",
                  label: "Orderbook guide",
                },
                {
                  href: "https://docs.polkadex.trade/orderbookPolkadexFAQWallets",
                  label: "FAQ",
                },
              ]}
            >
              Support
            </HeaderLink.Dropdown>
            <HeaderLink.Dropdown
              items={[
                {
                  href: "https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf",
                  label: "Terms of use",
                },
                {
                  href: "https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf",
                  label: "Privacy policy",
                },
                {
                  href: "https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf",
                  label: "Disclaimer",
                },
                {
                  href: "https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf",
                  label: "Excluded Jurisdictions",
                },
                {
                  href: "https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Data_Retention_Policy.pdf",
                  label: "Data Retention Policy",
                },
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
