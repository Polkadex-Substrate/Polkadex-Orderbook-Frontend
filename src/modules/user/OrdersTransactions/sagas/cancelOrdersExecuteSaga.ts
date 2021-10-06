import { call, put } from 'redux-saga/effects';
import { CancelOrdersExecutionAction } from '../actions';

export function* cancelOrdersSaga(action: CancelOrdersExecutionAction){
    try {
        const {account, nonce, baseAsset, quoteAsset, order_uuid } = action.payload;
        const polkadexWorker = (window as any).polkadexWorker
        const _cancelOrder = yield call(() => polkadexWorker.cancelOrder(
            account,
            nonce,
            baseAsset,
            quoteAsset,
            order_uuid
        ));
        console.log({_cancelOrder});
  
    } catch (error) {
        
    }
}