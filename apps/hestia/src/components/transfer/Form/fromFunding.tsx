"use client";

import { AccountInfo } from "../../ui/ReadyToUse";

import { Card } from "./card";

export const FromFunding = ({
  focused,
  fromFunding,
  extensionAccountName,
  extensionAccountAddress,
  extensionAccountBalance = "0",
  localAccountName,
  localAccountAddress,
  localAccountBalance = "0",
  selectedAssetTicker = "",
}: {
  focused?: boolean;
  fromFunding?: boolean;
  extensionAccountName?: string;
  extensionAccountAddress?: string;
  extensionAccountBalance?: string;
  localAccountName?: string;
  localAccountAddress?: string;
  localAccountBalance?: string;
  selectedAssetTicker?: string;
}) => {
  return (
    <Card
      active={focused}
      label="From"
      title={fromFunding ? "Funding Account" : "Trading Account"}
    >
      <AccountInfo
        name={fromFunding ? extensionAccountName : localAccountName}
        address={fromFunding ? extensionAccountAddress : localAccountAddress}
        ticker={selectedAssetTicker}
        balance={fromFunding ? extensionAccountBalance : localAccountBalance}
      />
    </Card>
  );
};
