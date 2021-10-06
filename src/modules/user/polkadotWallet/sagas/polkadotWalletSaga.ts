import { call, put } from 'redux-saga/effects';
import { sendError } from '../../..';
import { PolkadotWalletFetch, polkadotWalletData, InjectedAccount } from '../actions';
import { types } from '../types'
import  { ApiPromise, WsProvider } from '@polkadot/api';
import { polkadexUrl } from 'src/api';


export function* polkadotWalletSaga(action: PolkadotWalletFetch) {
    try {
        const api = yield call(() => createPolkadotWalletApi())
        const allAccounts: InjectedAccount[] = yield call(getAllPoladotWalletAccounts);
        console.log({ api, allAccounts })
        yield put(polkadotWalletData({ api, allAccounts }));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
        }));
    }
}
async function createPolkadotWalletApi(){
    // const { ApiPromise, WsProvider } =await import('@polkadot/api');
    const wsUrl = polkadexUrl()
    const wsProvider = new WsProvider(wsUrl);
    console.log({ wsProvider })
    const api = await ApiPromise.create({ provider: wsProvider, types });
    console.log({api})
    return api;
}
async function getAllPoladotWalletAccounts(): Promise<InjectedAccount[]> {
    const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');
    const extensions = await web3Enable('polkadot');
    if (extensions.length === 0) {
        throw new Error("no extensions installed")
    }
    const allAccounts = await web3Accounts({ ss58Format: 88 });
    console.log("here", allAccounts)
    return allAccounts.map(account => {
        return {
            address: account.address,
            meta: account.meta,
            type: account.type
        }
    })
}
