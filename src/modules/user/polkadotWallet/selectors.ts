import { ApiPromise } from '@polkadot/api';
import { InjectedAccount } from '.';
import {  RootState } from '../..';

export const selectPolkadotWalletApi = (state: RootState): ApiPromise | undefined =>
    state.user.polkadotWallet.api

export const selectPolkadotWalletLoading = (state: RootState): boolean =>
    state.user.polkadotWallet.loading;

export const selectPolkadotWalletAccounts = (state: RootState): InjectedAccount[] =>
    state.user.polkadotWallet.allAccounts;

export const selectPolkadotWalletCurrentAccount= (state:RootState): InjectedAccount =>
    state.user.polkadotWallet.selectedAccount