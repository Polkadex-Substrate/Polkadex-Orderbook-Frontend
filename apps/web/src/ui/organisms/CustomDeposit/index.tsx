import {
  DepositHistory,
  TransferFormDeposit,
} from "@polkadex/orderbook-ui/organisms";

import * as S from "./styles";

import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const CustomDeposit = ({
  onOpenAssets,
  selectedAsset,
  onChangeType,
  hasUser,
  fundWalletPresent,
}: {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onChangeType: () => void;
  hasUser: boolean;
  fundWalletPresent: boolean;
}) => {
  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferFormDeposit
            onTransferInteraction={onChangeType}
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
            fundWalletPresent={fundWalletPresent}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <DepositHistory
          selectedAsset={selectedAsset}
          hasUser={hasUser || fundWalletPresent}
        />
      </S.History>
    </S.Content>
  );
};
