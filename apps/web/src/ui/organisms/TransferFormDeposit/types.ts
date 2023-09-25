import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export type GenericAsset = Record<string, string | null>;

export type Props = {
  onTransferInteraction: () => void;
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
};
