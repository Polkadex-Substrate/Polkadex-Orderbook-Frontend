"use client";

import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { ExtensionAccount, useExtensions } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { Interaction, Typography, useInteractableProvider } from "@polkadex/ux";
import { useTheaProvider } from "@orderbook/core/providers";
import { useMeasure } from "react-use";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { Chain } from "@polkadex/thea";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiExpandUpDownFill } from "@remixicon/react";

import { Expandable } from "../../ui/ReadyToUse/expandable";

import { ProviderCard } from "./providerCard";
import { SelectNetwork } from "./selectNetwork";
import { AccountCard } from "./accountCard";

import { createQueryString } from "@/helpers";

export type Extension = (typeof ExtensionsArray)[0] | null;

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);

export const ConnectWallet = ({
  onSetExtension,
  onClose,
  selectedChain,
  setChain,
  selectedAccount,
  secondaryChain,
  from,
}: {
  onClose: () => void;
  onSetExtension: (e: Extension) => void;
  selectedChain: Chain | null;
  setChain: Dispatch<SetStateAction<Chain | null>>;
  selectedAccount?: ExtensionAccount;
  secondaryChain?: string;
  from?: boolean;
}) => {
  const [networkOpen, setNetworkOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const { setPage } = useInteractableProvider();
  const { extensionsStatus } = useExtensions();
  const { chains } = useTheaProvider();
  const ExtensionsWhitelist = useMemo(
    () =>
      ExtensionsArrayWhitelist?.sort(
        (a, b) =>
          Number(!!extensionsStatus[b.id]) - Number(!!extensionsStatus[a.id])
      ),
    [extensionsStatus]
  );
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <Interaction className="w-full sm:min-w-[24rem] sm:max-w-[24rem] rounded-md">
        <Interaction.Title onClose={{ onClick: onClose }}>
          Connect your wallet
        </Interaction.Title>
        <Interaction.Content withPadding={false}>
          <motion.div
            animate={{
              height: bounds.height ?? 0,
            }}
          >
            <div ref={ref} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Typography.Text appearance="secondary" className="px-7">
                  1. Select a network
                </Typography.Text>
                <div className="w-full px-3">
                  <Expandable
                    open={networkOpen}
                    setOpen={setNetworkOpen}
                    className="max-h-[280px] overflow-auto scrollbar-hide"
                  >
                    {chains.map((e) => {
                      const id = e.genesis;
                      const visible = selectedChain?.genesis.includes(id);
                      if (id === secondaryChain) return null;
                      return (
                        <Expandable.Item
                          key={e.genesis}
                          visible={!!visible}
                          hasData={!!selectedChain}
                          onSelect={() => {
                            setChain(e);
                            createQueryString({
                              name: from ? "from" : "to",
                              value: e.name,
                              pathname,
                              searchParams,
                              push,
                            });
                          }}
                        >
                          <SelectNetwork icon={e.logo}>{e.name}</SelectNetwork>
                        </Expandable.Item>
                      );
                    })}
                  </Expandable>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Typography.Text appearance="secondary" className="px-7">
                  2. Select a wallet
                </Typography.Text>
                <AnimatePresence>
                  {selectedChain && !networkOpen && (
                    <Fragment>
                      {!accountOpen && selectedAccount ? (
                        <div className="flex items-center justify-between gap-2 mx-4 pl-2 pr-3 py-3 hover:bg-level-1 transition-colors duration-200 border-primary border rounded-md cursor-pointer">
                          <AccountCard
                            name={selectedAccount.name}
                            address={selectedAccount.address}
                            onClick={() => setAccountOpen(true)}
                            hoverable={false}
                          />
                          <RiExpandUpDownFill className="w-4 h-4 text-secondary" />
                        </div>
                      ) : (
                        <div className="flex flex-col px-3 overflow-auto">
                          {ExtensionsWhitelist?.map((value) => (
                            <ProviderCard
                              key={value.id}
                              title={value.title}
                              icon={value.id}
                              action={() => {
                                onSetExtension(value);
                                setPage("authorization");
                              }}
                              href={
                                (value.website as string) ?? value.website[0]
                              }
                              installed={!!extensionsStatus?.[value.id]}
                            />
                          ))}
                        </div>
                      )}
                    </Fragment>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </Interaction.Content>
        <Interaction.Footer>
          <Interaction.Close appearance="secondary" onClick={onClose}>
            Close
          </Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </MotionConfig>
  );
};

// Temp
export const tokens = {
  Polkadex: "PDEX",
  Sepolia: "ETH",
  Polkadot: "DOT",
  AssetHub: "USDT",
};
