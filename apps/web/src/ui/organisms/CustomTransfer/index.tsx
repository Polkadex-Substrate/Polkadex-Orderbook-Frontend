import { TransferForm } from "@polkadex/orderbook-ui/organisms";
import { useTransferHistory } from "@orderbook/core/index";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { defaultConfig } from "@orderbook/core/config";

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

  const { mainAddress } = selectedAccount;

  const { data, isLoading, refetch } = useTransferHistory(
    defaultConfig.subscanApi,
    mainAddress,
    mainAddress?.length > 0
  );

  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferForm
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
            onDisableSwitch={onDisableSwitch}
            switchEnable={switchEnable}
            onRefetch={() => setTimeout(refetch, 70000)}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <TransferHistory
          selectedAsset={selectedAsset}
          transactions={data?.pages?.[0]?.transfers ?? []}
          isLoading={isLoading}
        />
      </S.History>
    </S.Content>
  );
};
