import { ApiPromise } from '@polkadot/api';
import { GetPolkadotWalletAction, InjectedAccount } from './actions';
import {
    GET_POLKADOT_WALLET_FETCH,
    GET_POLKADOT_WALLET_FETCH_ERROR,
    GET_POLKADOT_WALLET_DATA,
    SET_POLKADOT_WALLET_ACCOUNT,
} from './constants';

export interface PolkadotWalletState {
    loading: boolean;
    getApiSuccess: boolean;
    api?: ApiPromise;
    allAccounts: InjectedAccount[];
    selectedAccount: InjectedAccount;
}

const initialState: PolkadotWalletState = {
    loading: false,
    getApiSuccess: false,
    allAccounts: [],
    selectedAccount: { address: "", meta: {}, type: {} },
};

export const polkadotWalletReducer = (state = initialState, action: GetPolkadotWalletAction): PolkadotWalletState => {
    switch (action.type) {
        case GET_POLKADOT_WALLET_DATA:
            return {
                ...state,
                api: action.payload.api,
                loading: false,
                allAccounts: action.payload.allAccounts
            };
        case GET_POLKADOT_WALLET_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                getApiSuccess: false
            };
        case GET_POLKADOT_WALLET_FETCH:
            return {
                ...state,
                loading: true,
            };
        case SET_POLKADOT_WALLET_ACCOUNT:
            return {
                ...state,
                selectedAccount: action.payload
            }
        default:
            return state;
    }
};
