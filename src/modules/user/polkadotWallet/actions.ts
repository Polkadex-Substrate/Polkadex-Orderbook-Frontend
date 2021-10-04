import { ApiPromise } from '@polkadot/api';
import { CommonError } from '../../types';
import {
    GET_POLKADOT_WALLET_FETCH,
    GET_POLKADOT_WALLET_FETCH_ERROR,
    GET_POLKADOT_WALLET_DATA,
} from './constants';

export interface InjectedAccount {
    address: string;
    meta: {
        name?: string;
        source?: any;
    }
    type: any
}
export interface PolkadotWalletFetchPayload {
    api: ApiPromise,
    allAccounts: InjectedAccount[],
}

export interface PolkadotWalletFetch {
    type: typeof GET_POLKADOT_WALLET_FETCH;
}

export interface PolkadotWalletError {
    type: typeof GET_POLKADOT_WALLET_FETCH_ERROR;
    error: CommonError;
}

export interface PolkadotWalletData {
    type: typeof GET_POLKADOT_WALLET_DATA;
    payload: PolkadotWalletFetchPayload
}


export type GetPolkadotWalletAction =
    PolkadotWalletFetch
    | PolkadotWalletError
    | PolkadotWalletData;

export const polkadotWalletData = (payload: PolkadotWalletFetchPayload): PolkadotWalletData => ({
    type: GET_POLKADOT_WALLET_DATA,
    payload,
});

export const polkadotWalletError = (error: CommonError): PolkadotWalletError => ({
    type: GET_POLKADOT_WALLET_FETCH_ERROR,
    error,
});

export const polkadotWalletFetch = (): PolkadotWalletFetch => ({
    type: GET_POLKADOT_WALLET_FETCH,
});
