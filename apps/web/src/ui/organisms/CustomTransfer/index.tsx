import { TransferForm } from "@polkadex/orderbook-ui/organisms";
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
  const { selectedAccount } = useProfile();

  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferForm
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
            onDisableSwitch={onDisableSwitch}
            switchEnable={switchEnable}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <TransferHistory
          selectedAsset={selectedAsset}
          address={selectedAccount?.mainAddress ?? ""} // TODO: Fix types
        />
      </S.History>
    </S.Content>
  );
};
