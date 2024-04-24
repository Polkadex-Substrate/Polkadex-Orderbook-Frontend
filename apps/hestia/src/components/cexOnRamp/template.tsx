"use client";

import { renderSendWidget } from "@cedelabs/widgets-universal";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { Typography } from "@polkadex/ux";
import { RiInformation2Line } from "@remixicon/react";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useResizeObserver, useWindowSize } from "usehooks-ts";

import { Help } from "../transfer/Help";
import { SelectAsset } from "../transfer/SelectAsset";
import { ConnectTradingInteraction } from "../ui/ConnectWalletInteraction/connectTradingInteraction";
import { QuickStart } from "../ui/Footer/QuickStart";
import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";
import { themeConfig } from "../../../../../themeConfig";

import { Footer, Header } from "@/components/ui";
import { useTour, useTransfer } from "@/hooks";

export function Template() {
  const { width } = useWindowSize();
  const { onOpenChange, open, onClose } = useTour();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);
  const formwRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });

  const { height: interactionHeight = 0 } = useResizeObserver({
    ref: interactionRef,
    box: "border-box",
  });

  const {
    onChangeAsset,
    selectedAsset,
    assetsInteraction,
    onAssetsInteraction,
  } = useTransfer();

  const { selectedWallet, browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  useEffect(() => {
    renderSendWidget("#cede-widget", {
      theme: {
        borderRadius: -15,
        borderColor: themeConfig.theme.extend.colors["secondary-base"],
        inputBorderColor: themeConfig.theme.extend.colors["secondary-base"],
        logoBorderColor: themeConfig.theme.extend.colors["primary-base"],
        accentColor: themeConfig.theme.extend.colors["primary-base"],
      },
      config: {
        tokenSymbol: "PDEX",
        network: "polkadex",
        address: selectedWallet?.address,
      },
    });
  }, []);

  const mobileView = useMemo(() => width <= 640, [width]);

  return (
    <Fragment>
      <QuickStart open={open} onOpenChange={onClose} />
      <ConnectTradingInteraction />
      <SelectAsset
        open={assetsInteraction}
        onOpenChange={() => onAssetsInteraction()}
        selectedAssetId={selectedAsset?.id}
        onChangeAsset={onChangeAsset}
      />
      <div
        className="flex flex-1 flex-col bg-backgroundBase h-full"
        vaul-drawer-wrapper=""
      >
        <Header ref={headerRef} />
        <main
          className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-[1920px] m-auto"
          style={{
            paddingBottom: mobileView
              ? `${interactionHeight}px`
              : `${footerHeight}px`,
          }}
        >
          <div className="flex flex-col flex-1">
            <div ref={formwRef} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  CEX On-Ramp
                </Typography.Text>
                <RiInformation2Line className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div id="cede-widget" />
            </div>
            <Help ref={helpRef} />
          </div>
        </main>
        {mobileView && (browserAccountPresent || extensionAccountPresent) && (
          <div
            ref={interactionRef}
            className="flex flex-col gap-4 bg-level-1 border-t border-primary py-3 px-2 fixed bottom-0 left-0 w-full"
          >
            <ResponsiveProfile
              extensionAccountPresent={extensionAccountPresent}
              browserAccountPresent={browserAccountPresent}
            />
          </div>
        )}
        {!mobileView && <Footer onOpenChange={onOpenChange} ref={footerRef} />}
      </div>
    </Fragment>
  );
}
