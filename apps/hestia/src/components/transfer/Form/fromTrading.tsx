"use client";

import { Icon, Typography } from "@polkadex/ux";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { AccountInfo, InlineAccountCard } from "../../ui/ReadyToUse";

import { Card } from "./card";

export const FromTrading = ({
  isLocalAccountPresent,
  isExtensionAccountPresent,
  fromFunding,
  extensionAccountName,
  extensionAccountAddress,
  extensionAccountBalance = "0",
  localAccountBalance = "0",
  selectedAssetTicker = "",
}: {
  fromFunding?: boolean;
  extensionAccountName?: string;
  extensionAccountAddress?: string;
  extensionAccountBalance?: string;
  localAccountBalance?: string;
  selectedAssetTicker?: string;
  isExtensionAccountPresent?: boolean;
  isLocalAccountPresent?: boolean;
}) => {
  const accountNotPresent =
    (fromFunding && !isLocalAccountPresent) ||
    (!fromFunding && !isExtensionAccountPresent);

  return (
    <Card
      label="To"
      title={fromFunding ? "Trading Account" : "Funding Account"}
    >
      <AccountInfo
        name={extensionAccountName}
        address={extensionAccountAddress}
        ticker={selectedAssetTicker}
        balance={fromFunding ? localAccountBalance : extensionAccountBalance}
      >
        {fromFunding ? (
          <div className="flex gap-2 flex-1">
            <Icon size="xs" className="bg-info-base rounded-md">
              <InformationCircleIcon />
            </Icon>
            <Typography.Text className="self-center whitespace-nowrap">
              All trading accounts
            </Typography.Text>
          </div>
        ) : (
          accountNotPresent && (
            <InlineAccountCard>Account not present</InlineAccountCard>
          )
        )}
      </AccountInfo>
    </Card>
  );
};
