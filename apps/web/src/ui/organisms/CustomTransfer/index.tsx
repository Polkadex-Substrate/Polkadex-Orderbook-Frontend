import { TransferForm } from "@polkadex/orderbook-ui/organisms";
import { useMemo, useState } from "react";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as S from "./styles";

import { TransferHistory } from "@/ui/organisms/TransferHistory";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const CustomTransfer = ({
  onOpenAssets,
  selectedAsset,
  onDisableSwitch,
  switchEnable,
}: {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onDisableSwitch: () => void;
  switchEnable: boolean;
}) => {
  const { allAccounts } = useExtensionWallet();
  const { selectedAccount } = useProfile();

  const { mainAddress } = selectedAccount;
  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const [selectedFundingWallet, setSelectedFundingWallet] =
    useState<ExtensionAccount | null>(fundingWallet ?? null);

  const selectedAddress = selectedFundingWallet?.account?.address;

  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferForm
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
            onDisableSwitch={onDisableSwitch}
            switchEnable={switchEnable}
            selectedTransferWallet={selectedFundingWallet}
            onSelectedTransferWallet={setSelectedFundingWallet}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <TransferHistory
          selectedAsset={selectedAsset}
          address={selectedAddress ?? ""} // TODO: Fix types
        />
      </S.History>
    </S.Content>
  );
};
