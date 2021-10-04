import { ApiPromise } from '@polkadot/api';
import {  RootState } from '../..';

export const selectPolkadotWalletApi = (state: RootState): ApiPromise | undefined =>
    state.user.polkadotWallet.api

export const selectPolkadotWalletLoading = (state: RootState): boolean =>
    state.user.polkadotWallet.loading;

export const selectPolkadotWalletAccounts = (state: RootState): any =>
    state.user.polkadotWallet.allAccounts;

