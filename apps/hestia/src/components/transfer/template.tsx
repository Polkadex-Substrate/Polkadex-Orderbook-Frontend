"use client";

import { GenericMessage, Tabs, Typography } from "@polkadex/ux";
import { Fragment, useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTransactions, useTransferHistory } from "@orderbook/core/hooks";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { usePathname, useRouter } from "next/navigation";

import { ConnectTradingInteraction } from "../ui/ConnectWalletInteraction/connectTradingInteraction";

import { Help } from "./Help";
import { SelectAsset } from "./SelectAsset";
import { Form } from "./Form";
import { History } from "./History";
import { ReadyToClaim } from "./ReadyToClaim";
import { useSizeProvider } from "./provider";

import { Footer, Header } from "@/components/ui";
import { useTransfer } from "@/hooks";
import { defaultConfig } from "@/config";

const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export function Template() {
  const router = useRouter();
  const pathname = usePathname();

  const { headerRef, footerRef, formwRef, helpRef, tableTitleRef } =
    useSizeProvider();

  const {
    onChangeAsset,
    selectedAsset,
    assetsInteraction,
    onAssetsInteraction,
    type,
    onChangeType,
    createQueryString,
  } = useTransfer();

  const { readyWithdrawals } = useTransactions();
  const { selectedAccount, selectedWallet } = useConnectWalletProvider();
  const { onToogleConnectExtension } = useSettingsProvider();
  const [activeTab, setActiveTab] = useState("history");

  const { data, isLoading, refetch } = useTransferHistory(
    defaultConfig.subscanApi,
    selectedWallet?.address as string,
    !!selectedWallet
  );

  useEffect(() => {
    if (readyWithdrawals?.length) setActiveTab("readyToClaim");
  }, [readyWithdrawals?.length]);

  return (
    <Fragment>
      <ConnectTradingInteraction />
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
          <div className="flex flex-col flex-1">
            <div ref={formwRef} className="flex-1 flex flex-col">
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
                onChangeType={(e) => {
                  onChangeType(e);
                  router.push(pathname + "?" + createQueryString("type", e));
                }}
                refetch={async () => {
                  await sleep(55000);
                  await refetch();
                }}
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
                      <History
                        subscanData={data?.pages?.[0]?.transfers}
                        subscanLoading={isLoading}
                      />
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
                    title="Connect Trading Account"
                    illustration="ConnectAccount"
                    className="bg-level-0 border-b border-primary"
                  />
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
