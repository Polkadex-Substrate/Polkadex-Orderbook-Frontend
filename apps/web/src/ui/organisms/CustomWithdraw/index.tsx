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
}: {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onChangeType: () => void;
}) => {
  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferFormWithdraw
            onTransferInteraction={onChangeType}
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <WithdrawHistory selectedAsset={selectedAsset} />
      </S.History>
    </S.Content>
  );
};
