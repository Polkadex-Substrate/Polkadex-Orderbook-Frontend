import { KeyringPair } from "@polkadot/keyring/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
export interface CommonActionState {
  isLoading: boolean;
  message: string[];
  isError: boolean;
  isSuccess: boolean;
}

export type CommonError = {
  code: number;
  message: string[];
};

export type TradeAccount = KeyringPair;
export interface ExtensionAccount {
  account: InjectedAccountWithMeta;
  signer: Signer;
}
