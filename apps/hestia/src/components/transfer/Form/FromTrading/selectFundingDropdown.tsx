"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import {
  ExtensionAccount,
  useExtensionAccounts,
  useExtensions,
} from "@polkadex/react-providers";
import {
  Button,
  Icons,
  Popover,
  Searchable,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "usehooks-ts";
import classNames from "classnames";
import { isValidAddressAddress } from "@orderbook/core/helpers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ProviderCard } from "./providerCard";
import { AccountCard } from "./accountCard";

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  ({ id }) => id !== "metamask-polkadot-snap"
);

const initialValue = ExtensionsArray.find(({ id }) => id === "polkadot-js");

export const SelectFundingDropdown = ({
  selectedExtensionAccount,
  setSelectedExtensionAccount,
}: {
  selectedExtensionAccount: ExtensionAccount | null;
  setSelectedExtensionAccount: Dispatch<
    SetStateAction<ExtensionAccount | null>
  >;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState(initialValue);

  const { extensionsStatus } = useExtensions();
  const { extensionAccounts } = useExtensionAccounts();
  const { selectedWallet } = useConnectWalletProvider();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const shortAddress = truncateString(selectedExtensionAccount?.address ?? "");
  const walletsFiltered = useMemo(
    () =>
      extensionAccounts
        ?.filter(({ source }) => source === selectedExtension?.id)
        .filter((v) => v.address !== selectedWallet?.address),
    [extensionAccounts, selectedExtension?.id, selectedWallet?.address]
  );

  const onPaste = async () => {
    try {
      const address = await navigator.clipboard.readText();
      const isValidAddress = isValidAddressAddress(address);

      if (isValidAddress)
        setSelectedExtensionAccount({
          name: "Custom address",
          address,
          type: "sr25519",
          source: "custom",
        });
      else {
        if (buttonRef.current) {
          buttonRef.current.innerText = "Invalid address";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        ref={ref}
        className="px-5 py-3 border-t border-primary"
        superpositionTrigger
      >
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center justify-center bg-level-2 w-6 h-6 rounded-md">
              <Icons.Wallet className="w-3 h-3 text-primary" />
            </div>
            <Typography.Text
              appearance={selectedExtensionAccount ? "base" : "primary"}
            >
              {selectedExtensionAccount ? (
                <Fragment>
                  <strong>{selectedExtensionAccount?.name} </strong>
                  {shortAddress}
                </Fragment>
              ) : (
                "Select or enter a Polkadex address"
              )}
            </Typography.Text>
          </div>
          {selectedExtensionAccount?.source === "custom" ? (
            <Button.Solid
              appearance="secondary"
              size="xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedExtensionAccount(null);
              }}
            >
              Clear
            </Button.Solid>
          ) : (
            <Button.Solid
              ref={buttonRef}
              appearance="secondary"
              size="xs"
              onMouseOut={() => {
                if (buttonRef.current) {
                  buttonRef.current.innerText = "Paste";
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPaste();
              }}
            >
              Paste
            </Button.Solid>
          )}
        </div>

        <Popover.Icon />
      </Popover.Trigger>
      <Popover.Content style={{ width }}>
        <Searchable>
          <Searchable.Input placeholder="Search account" />
          <Searchable.List>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 pr-2 pt-2 pb-2 border-r border-r-primary">
                {ExtensionsArrayWhitelist?.sort(
                  (a, b) =>
                    Number(!!extensionsStatus[b.id]) -
                    Number(!!extensionsStatus[a.id])
                )?.map((value) => {
                  const selected = value.id === selectedExtension?.id;
                  return (
                    <ProviderCard
                      selected={selected}
                      key={value.id}
                      title={value.title}
                      icon={value.id}
                      action={() => setSelectedExtension(value)}
                      installed={!!extensionsStatus?.[value.id]}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col flex-1">
                <Searchable.Empty className="flex-1 flex items-center justify-center">
                  No result found
                </Searchable.Empty>
                <Searchable.Group heading="Accounts">
                  {walletsFiltered.map((curr) => {
                    const selected =
                      selectedExtensionAccount?.address === curr.address;

                    return (
                      <Searchable.Item
                        key={curr.name}
                        value={curr.name}
                        className={classNames(
                          "mb-1 mr-1",
                          selected && "bg-level-3"
                        )}
                        onSelect={() => {
                          setSelectedExtensionAccount(curr);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between gap-4 w-full flex-1">
                          <AccountCard
                            address={curr.address}
                            name={curr.name}
                            hoverable={false}
                          />
                          <CheckIcon
                            className={`ml-auto h-4 w-4 ${
                              selectedExtensionAccount?.address !==
                                curr.address && "opacity-0"
                            }`}
                          />
                        </div>
                      </Searchable.Item>
                    );
                  })}
                </Searchable.Group>
              </div>
            </div>
          </Searchable.List>
        </Searchable>
      </Popover.Content>
      <Popover.Overlay />
    </Popover>
  );
};
