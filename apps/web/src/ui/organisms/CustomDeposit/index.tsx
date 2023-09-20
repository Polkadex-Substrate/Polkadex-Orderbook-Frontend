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
}: {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onChangeType: () => void;
}) => {
  return (
    <S.Content>
      <S.Form>
        <S.Container>
          <TransferFormDeposit
            onTransferInteraction={onChangeType}
            onOpenAssets={onOpenAssets}
            selectedAsset={selectedAsset}
          />
        </S.Container>
      </S.Form>
      <S.History>
        <DepositHistory selectedAsset={selectedAsset} />,
      </S.History>
    </S.Content>
  );
};
