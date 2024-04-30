"use client";

import { Interactable, Modal } from "@polkadex/ux";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useExtensionAccounts } from "@polkadex/react-providers";

import { ConnectWallet } from "./connectWallet";

import { Authorization } from "@/components/ui/ConnectWallet/authorization";
import { ExtensionAccounts } from "@/components/ui/ConnectWallet/extensionAccounts";

export const ConnectAccount = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { onSetAccount, extension, setExtension } = [] as any;

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
                onActionCallback={() => {}}
              />
            </Interactable.Card>
            <Interactable.Card pageName="accounts">
              <ExtensionAccounts
                key="ConnectFundingWallets"
                extensionAccounts={walletsFiltered}
                onSelectExtensionAccount={(e) => {
                  onSetAccount(e);
                  handleClose();
                }}
                // onResetExtension={() => setExtension(null)}
                onClose={handleClose}
              />
            </Interactable.Card>
          </Interactable.Content>
        </Interactable>
      </Modal.Content>
    </Modal>
  );
};
