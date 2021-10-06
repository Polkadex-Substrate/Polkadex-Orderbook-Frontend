import { ApiPromise, WsProvider } from '@polkadot/api';
import { call, put } from 'redux-saga/effects';
import { sendError } from '../../..';
import { PolkadotWalletFetch, polkadotWalletData, InjectedAccount } from '../actions';
import { types } from '../types'


export function* polkadotWalletSaga(action: PolkadotWalletFetch) {
    try {
        const api = yield call(() => createPolkadotWalletApi())
        const allAccounts = yield call(getAllPoladotWalletAccounts);
        console.log({ api, allAccounts })
        yield put(polkadotWalletData({ api, allAccounts }));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
        }));
    }
}
async function createPolkadotWalletApi() {
    const wsProvider = new WsProvider("wss://openfinex.polkadex.trade");
    console.log({wsProvider})
    const api = await ApiPromise.create({ provider: wsProvider, types });
    return api;
}
async function getAllPoladotWalletAccounts():Promise<InjectedAccount[]>{
    const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');
    const extensions = await web3Enable('polkadot');
    if (extensions.length === 0) {
        throw new Error("no extensions installed")
    }
    const allAccounts = await web3Accounts({ ss58Format: 88 });
    return allAccounts.map(account => {
        return {
            address: account.address,
            meta: account.meta,
            type: account.type
        }
    })
}