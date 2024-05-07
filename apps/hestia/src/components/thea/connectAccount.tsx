"use client";

import { Interactable, Modal } from "@polkadex/ux";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  ExtensionAccount,
  useExtensionAccounts,
} from "@polkadex/react-providers";
import { Chain } from "@polkadex/thea";

import {
  Authorization,
  ConnectWallet,
  Extension,
  ExtensionAccounts,
} from "./connectWallet";

export const ConnectAccount = ({
  open,
  onOpenChange,
  selectedChain,
  secondaryChain,
  setChain,
  setAccount,
  selectedAccount,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  selectedChain: Chain | null;
  secondaryChain?: string;
  setChain: Dispatch<SetStateAction<Chain | null>>;
  setAccount: Dispatch<SetStateAction<ExtensionAccount>>;
  selectedAccount: ExtensionAccount | null;
}) => {
  const [extension, setExtension] = useState<Extension>();

  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();

  const sourceId = useMemo(() => extension?.id, [extension?.id]);

  const walletsFiltered = useMemo(
    () =>
      !!extensionAccounts && !!sourceId
        ? extensionAccounts.filter((e) => e.source === sourceId)
        : [],
    [extensionAccounts, sourceId]
  );

  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      closeOnClickOutside
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Interactable>
          <Interactable.Trigger>
            <ConnectWallet
              onSetExtension={setExtension}
              onClose={handleClose}
              selectedChain={selectedChain}
              setChain={setChain}
              selectedAccount={selectedAccount}
              secondaryChain={secondaryChain}
            />
          </Interactable.Trigger>
          <Interactable.Content>
            <Interactable.Card pageName="authorization">
              <Authorization
                onAction={async () =>
                  await connectExtensionAccounts(sourceId as string)
                }
                extensionName={extension?.title}
                extensionIcon={extension?.id}
              />
            </Interactable.Card>
            <Interactable.Card pageName="accounts">
              <ExtensionAccounts
                key="ConnectFundingWallets"
                extensionAccounts={walletsFiltered}
                onSelectExtensionAccount={(e) => {
                  setAccount(e);
                  handleClose();
                }}
                onResetExtension={() => setExtension(null)}
                onClose={handleClose}
              />
            </Interactable.Card>
          </Interactable.Content>
        </Interactable>
      </Modal.Content>
    </Modal>
  );
};
