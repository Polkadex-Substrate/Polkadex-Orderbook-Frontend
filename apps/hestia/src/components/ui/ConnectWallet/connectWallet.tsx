"use client";

import { PropsWithChildren, useState } from "react";
import { ExtensionStatus } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionDetails } from "@polkadex/types";
import { Interaction, InteractionProps, Typography } from "@polkadex/ux";

import { SelectChain, ProviderCard } from "../ReadyToUse";
const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);
interface ConnectWalletProps extends InteractionProps {
  onConnectProvider: (value: ExtensionDetails) => void;
  installedExtensions: Record<string, ExtensionStatus>;
  onBack: () => void;
  onConnectCallback: () => void;
}
export const ConnectWallet = ({
  children,
  onBack,
  installedExtensions,
  onConnectProvider,
  onConnectCallback,
  ...props
}: PropsWithChildren<ConnectWalletProps>) => {
  const [selectedChain, setSelectedChain] = useState<(typeof chains)[0]>(
    chains[0]
  );
  return (
    <Interaction
      withAnimation={false}
      className="bg-backgroundBase rounded-sm md:max-w-[24rem]"
      {...props}
    >
      <Interaction.Title onClose={onBack} size="lg">
        Connect your wallet
      </Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Typography.Text appearance="secondary" size="xs" className="px-7">
              Chain
            </Typography.Text>
            <div className="w-full px-3">
              <SelectChain
                chains={chains}
                onChange={(e) => setSelectedChain(e)}
              >
                <SelectChain.Card
                  title={selectedChain.name}
                  description={selectedChain.description}
                  icon={selectedChain.icon}
                  hoverable
                />
              </SelectChain>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text appearance="secondary" size="xs" className="px-7">
              Wallets available on the Polkadot chain
            </Typography.Text>
            <div className="flex flex-col px-3 max-h-[16rem] overflow-auto">
              {ExtensionsArrayWhitelist?.sort(
                (a, b) =>
                  Number(!!installedExtensions[b.id]) -
                  Number(!!installedExtensions[a.id])
              )?.map((value) => (
                <ProviderCard
                  key={value.id}
                  title={value.title}
                  icon={value.id}
                  action={() => {
                    onConnectProvider(value);
                    onConnectCallback();
                  }}
                  href={(value.website as string) ?? value.website[0]}
                  installed={!!installedExtensions?.[value.id]}
                />
              ))}
            </div>
          </div>
          {children}
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Typography.Paragraph size="xs" className="text-center">
          By using the application, you agree to our
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary-base align-middle"
          >
            {" "}
            Terms of Service{" "}
          </a>
          and our{" "}
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary-base align-middle"
          >
            Privacy Policy
          </a>
          .
        </Typography.Paragraph>
      </Interaction.Footer>
    </Interaction>
  );
};

export const chains = [
  {
    name: "Native Wallets",
    description: "Polkadot, Kusama & Parachains.",
    icon: "DOT",
    active: true,
  },
  {
    name: "Ethereum Wallets",
    description: "Moombeam, Astar, Ethereum, etc.",
    icon: "ETH",
    active: false,
  },
];
