"use client";

import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { useExtensions } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import {
  Interaction,
  useInteractableProvider,
  ProviderCard,
} from "@polkadex/ux";
import { CustomAccount } from "@orderbook/core/providers";
import { MotionConfig } from "framer-motion";
import { Chain } from "@polkadex/thea";
import { RiExpandUpDownFill } from "@remixicon/react";

import { AccountCard } from "./accountCard";
import { CustomAddress } from "./customAddress";

export type Extension = (typeof ExtensionsArray)[0] | null;

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);

export const ConnectWallet = ({
  onSetExtension,
  onClose,
  selectedChain,
  selectedAccount,
  onSelectCustomAccount,
  from,
}: {
  onClose: () => void;
  onSetExtension: (e: Extension) => void;
  selectedChain: Chain | null;
  setChain: Dispatch<SetStateAction<Chain | null>>;
  selectedAccount?: CustomAccount;
  secondaryChain?: string;
  onSelectCustomAccount?: (e: CustomAccount) => void;
  from?: boolean;
}) => {
  const [accountOpen, setAccountOpen] = useState(false);

  const { setPage } = useInteractableProvider();
  const { extensionsStatus } = useExtensions();
  const ExtensionsWhitelist = useMemo(
    () =>
      ExtensionsArrayWhitelist?.sort(
        (a, b) =>
          Number(!!extensionsStatus[b.id]) - Number(!!extensionsStatus[a.id])
      ),
    [extensionsStatus]
  );

  const isAccountEmpty = useMemo(
    () => Object.values(selectedAccount ?? {}).every((value) => !value),
    [selectedAccount]
  );
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <Interaction className="w-full sm:min-w-[24rem] sm:max-w-[24rem] rounded-md">
        <Interaction.Title onClose={{ onClick: onClose }}>
          Connect your wallet
        </Interaction.Title>
        <Interaction.Content withPadding={false}>
          {selectedChain && (
            <Fragment>
              {!accountOpen && !isAccountEmpty ? (
                <div className="mx-4 flex items-center justify-between gap-2 pl-2 pr-3 py-3 hover:bg-level-1 transition-colors duration-200 border-primary border rounded-md cursor-pointer">
                  <AccountCard
                    name={selectedAccount?.name}
                    address={selectedAccount?.address ?? ""}
                    onClick={() => setAccountOpen(true)}
                    hoverable={false}
                  />
                  <RiExpandUpDownFill className="w-4 h-4 text-secondary" />
                </div>
              ) : (
                <Fragment>
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
                        href={(value.website as string) ?? value.website[0]}
                        installed={!!extensionsStatus?.[value.id]}
                      />
                    ))}
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
          {!from && (
            <CustomAddress
              selectedAccount={selectedAccount}
              onSelectCustomAccount={onSelectCustomAccount}
            />
          )}
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
