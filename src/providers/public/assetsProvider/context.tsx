import { createContext } from "react";
import { boolean } from "yup";

import { initialState } from "./reducer";
import { AssetsContextProps, AssetsProviderProps, IPublicAsset } from "./types";

export const Context = createContext<AssetsContextProps>({
  ...initialState,
  fetchAssets: () => {},
  selectAssetsFetchSuccess: () => false,
  selectAllAssets: () => [],
  selectGetAsset: (): IPublicAsset => null,
});

export const Provider = ({ value, children }: AssetsProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
