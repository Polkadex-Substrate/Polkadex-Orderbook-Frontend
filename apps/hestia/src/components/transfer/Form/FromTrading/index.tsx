"use client";

import { Skeleton, Typography, truncateString } from "@polkadex/ux";
import { Dispatch, Fragment, PropsWithChildren, SetStateAction } from "react";
import { ExtensionAccount } from "@polkadex/react-providers";

import { InlineAccountCard } from "../../../ui/ReadyToUse";
import { Card } from "../card";
import { AvailableMessage } from "../availableMessage";

import { SelectFundingDropdown } from "./selectFundingDropdown";

export const FromTrading = ({
  isLocalAccountPresent,
  isExtensionAccountPresent,
  fromFunding,
  extensionAccountName,
  extensionAccountAddress,
  extensionAccountBalance = "0",
  localAccountBalance = "0",
  selectedAssetTicker = "",
  isFundingToFunding,
  onChangeDirection,
  selectedExtensionAccount,
  setSelectedExtensionAccount,
}: {
  fromFunding?: boolean;
  extensionAccountName?: string;
  extensionAccountAddress?: string;
  extensionAccountBalance?: string;
  localAccountBalance?: string;
  selectedAssetTicker?: string;
  isExtensionAccountPresent?: boolean;
  isLocalAccountPresent?: boolean;
  isFundingToFunding?: boolean;
  onChangeDirection: Dispatch<SetStateAction<boolean>>;
  selectedExtensionAccount: ExtensionAccount | null;
  setSelectedExtensionAccount: Dispatch<
    SetStateAction<ExtensionAccount | null>
  >;
}) => {
  const accountNotPresent =
    (fromFunding && !isLocalAccountPresent) ||
    (!fromFunding && !isExtensionAccountPresent);

  const title = isFundingToFunding
    ? "Another Funding Account"
    : "Trading Account";

  const balance = fromFunding ? localAccountBalance : extensionAccountBalance;
  const shortAddress = truncateString(extensionAccountAddress ?? "");

  return (
    <Card
      label="To"
      title={fromFunding ? title : "Funding Account"}
      dropdown={fromFunding}
      onChangeDirection={onChangeDirection}
    >
      <RenderConditional
        isFundingToFunding={!!isFundingToFunding}
        accountNotPresent={accountNotPresent}
        selectedExtensionAccount={selectedExtensionAccount}
        setSelectedExtensionAccount={setSelectedExtensionAccount}
      >
        <div className="flex justify-between gap-2 flex-wrap px-5 py-3 border-t border-primary">
          {fromFunding ? (
            <AvailableMessage />
          ) : (
            <InlineAccountCard
              loading={!extensionAccountAddress && !extensionAccountName}
            >
              <strong>{extensionAccountName}</strong> {shortAddress}
            </InlineAccountCard>
          )}

          <Skeleton loading={!selectedAssetTicker} className="h-auto max-w-20">
            <Typography.Text
              appearance="primary"
              size="xs"
              className="self-center whitespace-nowrap"
            >
              {balance} {selectedAssetTicker}
            </Typography.Text>
          </Skeleton>
        </div>
      </RenderConditional>
    </Card>
  );
};

const RenderConditional = ({
  isFundingToFunding,
  accountNotPresent,
  selectedExtensionAccount,
  setSelectedExtensionAccount,
  children,
}: PropsWithChildren<{
  isFundingToFunding: boolean;
  accountNotPresent: boolean;
  selectedExtensionAccount: ExtensionAccount | null;
  setSelectedExtensionAccount: Dispatch<
    SetStateAction<ExtensionAccount | null>
  >;
}>) => {
  if (isFundingToFunding)
    return (
      <SelectFundingDropdown
        selectedExtensionAccount={selectedExtensionAccount}
        setSelectedExtensionAccount={setSelectedExtensionAccount}
      />
    );
  else if (accountNotPresent)
    return (
      <div className="px-5 py-3 border-t border-primary">
        <InlineAccountCard>Account not present</InlineAccountCard>
      </div>
    );

  return <Fragment>{children}</Fragment>;
};
