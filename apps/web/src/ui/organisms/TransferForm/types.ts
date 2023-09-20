import { ExtensionAccount } from "@orderbook/core/providers/types";
import { Dispatch, SetStateAction } from "react";

import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export type GenericAsset = Record<string, string | null>;

export type Props = {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onDisableSwitch: (v?: boolean) => void;
  switchEnable: boolean;
  selectedTransferWallet: ExtensionAccount | null;
  onSelectedTransferWallet: Dispatch<SetStateAction<ExtensionAccount | null>>;
};
