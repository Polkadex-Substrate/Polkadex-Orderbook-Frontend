import { InputHTMLAttributes } from "react";
import { ITokens } from "src/utils/types";
import { RouterProps } from 'react-router';

import {
  Market,
  setMobileWalletUi,
  toggleMarketSelector,
  toggleSidebar,
} from 'src/modules';

export type InformationItemProps = {
  label?: string;
  text?: string | undefined;
  orientation?: "vertical" | "horizontal";
  color?: "white" | "red" | "green";
};

export type SearchProps = {
  value?: string;
  type?: "text" | "number";
  placeholder?: string;
  onChange?: (value: string) => void | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type PairProps = {
  token?: ITokens | undefined;
  pair?: boolean;
};

export type layoutProps = {
  activateMarkets: () => void;
  activateMarketsStatus: boolean;
};

export type  ReduxProps = {
  currentMarket: Market | undefined;
  colorTheme: string;
  mobileWallet: string;
  sidebarOpened: boolean;
  marketSelectorOpened: boolean;
}

export type DispatchProps = {
  setMobileWalletUi: typeof setMobileWalletUi;
  toggleSidebar: typeof toggleSidebar;
  toggleMarketSelector: typeof toggleMarketSelector;
}

type LocationProps = {
  location: {
      pathname: string;
  };
} & RouterProps

type CustomProps = {
  activateMarkets?: ()=> void;
  activateMarketsStatus: boolean;
}

export type Props = ReduxProps & DispatchProps & LocationProps & CustomProps;