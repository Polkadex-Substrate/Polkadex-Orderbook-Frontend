"use client";

import { PropsWithChildren, useMemo } from "react";
import { useExtensions } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import {
  Interaction,
  ProviderCard,
  Token,
  Typography,
  useInteractableProvider,
} from "@polkadex/ux";

export type Extension = (typeof ExtensionsArray)[0] | null;

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);

export const ConnectWallet = ({
  onSetExtension,
  onClose,
  children,
}: PropsWithChildren<{
  onClose: () => void;
  onSetExtension: (e: Extension) => void;
}>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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

  return (
    <Interaction className="w-full sm:min-w-[24rem] sm:max-w-[24rem] rounded-md">
      <Interaction.Title onClose={{ onClick: onClose }}>
        Connect your wallet
      </Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Typography.Text appearance="secondary" size="xs" className="px-7">
              Chain
            </Typography.Text>
            <div className="flex items-center gap-3 px-6 py-4 rounded-md w-full">
              <Token
                appearance="DOT"
                name="DOT"
                size="md"
                className="rounded-full"
              />
              <div className="flex flex-col items-start">
                <Typography.Text bold>Native Wallets</Typography.Text>
                <Typography.Text appearance="primary">
                  Polkadot, Kusama & Parachains.
                </Typography.Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text appearance="secondary" size="xs" className="px-7">
              Wallets available on the Polkadot chain
            </Typography.Text>
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
          </div>
          {children}
        </div>
      </Interaction.Content>
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
    description: "Moonbeam, Astar, Ethereum, etc.",
    icon: "ETH",
    active: false,
  },
];
