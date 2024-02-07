"use client";

import { Icon } from "@polkadex/ux";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { AccountInfo } from "../../ui/ReadyToUse";

import { Card } from "./card";

export const FromTrading = ({
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
}) => {
  return (
    <Card
      label="To"
      title={fromFunding ? "Trading Account" : "Funding Account"}
    >
      <AccountInfo
        name={fromFunding ? "All trading accounts" : extensionAccountName}
        address={extensionAccountAddress}
        ticker={selectedAssetTicker}
        balance={fromFunding ? localAccountBalance : extensionAccountBalance}
      >
        {fromFunding && (
          <Icon size="xs" className="bg-info-base rounded-md">
            <InformationCircleIcon />
          </Icon>
        )}
      </AccountInfo>
    </Card>
  );
};
