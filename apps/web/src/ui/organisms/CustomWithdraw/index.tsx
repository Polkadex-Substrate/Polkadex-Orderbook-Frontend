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
}: {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onChangeType: () => void;
  hasUser: boolean;
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
          />
        </S.Container>
      </S.Form>
      <S.History>
        <WithdrawHistory selectedAsset={selectedAsset} hasUser={hasUser} />
      </S.History>
    </S.Content>
  );
};
