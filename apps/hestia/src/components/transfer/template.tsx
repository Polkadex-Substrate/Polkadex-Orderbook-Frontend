"use client";

import { Button, GenericMessage, Tabs, Typography } from "@polkadex/ux";
import { useElementSize } from "usehooks-ts";
import { Fragment, useEffect, useMemo, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTransactions } from "@orderbook/core/hooks";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Help } from "./Help";
import { SelectAsset } from "./SelectAsset";
import { Form } from "./Form";
import { History } from "./History";
import { ReadyToClaim } from "./ReadyToClaim";

import { Footer, Header, Menu } from "@/components/ui";
import { useTransfer } from "@/hooks";

export function Template() {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [helpRef, { height: helpHeight }] = useElementSize();
  const [tableTitleRef, { height: tableTitleHeight }] = useElementSize();
  const [overviewRef, { height: overviewHeight }] = useElementSize();
  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        helpHeight +
        tableTitleHeight +
        1
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpHeight, tableTitleHeight]
  );
  const {
    onChangeAsset,
    selectedAsset,
    assetsInteraction,
    onAssetsInteraction,
    type,
    onChangeType,
  } = useTransfer();

  const { readyWithdrawals } = useTransactions();
  const { selectedAccount, selectedWallet } = useConnectWalletProvider();
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    if (readyWithdrawals?.length) setActiveTab("readyToClaim");
  }, [readyWithdrawals?.length]);

  return (
    <Fragment>
      <SelectAsset
        open={assetsInteraction}
        onOpenChange={() => onAssetsInteraction()}
        selectedAssetId={selectedAsset?.id}
        onChangeAsset={onChangeAsset}
      />
      <div
        className="flex flex-1 flex-col bg-backgroundBase max-sm:pb-16"
        vaul-drawer-wrapper=""
      >
        <Header ref={headerRef} />
        <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-[1920px] m-auto">
          <Menu />
          <div className="flex flex-col flex-1">
            <div ref={overviewRef} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  Transfer
                </Typography.Text>
                <InformationCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <Form
                assetsInteraction={assetsInteraction}
                selectedAsset={selectedAsset}
                onAssetsInteraction={onAssetsInteraction}
                type={type}
                onChangeType={(e) => onChangeType(e)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex-1 flex flex-col">
                <div
                  ref={tableTitleRef}
                  className="border-b border-primary px-4 w-full py-2"
                >
                  <Tabs.List>
                    <Tabs.Trigger value="history">History</Tabs.Trigger>
                    <Tabs.Trigger value="readyToClaim">
                      Ready to claim ({readyWithdrawals.length})
                    </Tabs.Trigger>
                  </Tabs.List>
                </div>
                {selectedAccount || selectedWallet ? (
                  <Fragment>
                    <Tabs.Content value="history" className="flex flex-col">
                      <History maxHeight={maxHeight} />
                    </Tabs.Content>
                    <Tabs.Content
                      value="readyToClaim"
                      className="flex flex-col"
                    >
                      <ReadyToClaim maxHeight={`300px`} />
                    </Tabs.Content>
                  </Fragment>
                ) : (
                  <GenericMessage
                    title="Connect your trading account to start trading."
                    illustration="ConnectAccount"
                  >
                    <Button.Solid>Connect Wallet</Button.Solid>
                  </GenericMessage>
                )}
              </div>
            </Tabs>
            <Help ref={helpRef} />
          </div>
        </main>
        <Footer ref={footerRef} />
      </div>
    </Fragment>
  );
}
