import {
  TransferFormWithdraw,
  WithdrawHistory,
} from "@polkadex/orderbook-ui/organisms";

import * as S from "./styles";

import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const CustomWithdraw = ({
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
          <TransferFormWithdraw
            onTransferInteraction={onChangeType}
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
            hasUser={hasUser}
            fundWalletPresent={fundWalletPresent}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <WithdrawHistory
          selectedAsset={selectedAsset}
          hasUser={hasUser || fundWalletPresent}
        />
      </S.History>
    </S.Content>
  );
};
