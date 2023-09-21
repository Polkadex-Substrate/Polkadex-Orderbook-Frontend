import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export type GenericAsset = Record<string, string | null>;

export type Props = {
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
  onDisableSwitch: (v?: boolean) => void;
  switchEnable: boolean;
};
