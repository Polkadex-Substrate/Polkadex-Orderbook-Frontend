import { call, put } from 'redux-saga/effects';
import { PlaceOrdersExecutionAction } from '../actions';

export function* placeOrdersSaga(action: PlaceOrdersExecutionAction){
    try {
        const {account, nonce, baseAsset, quoteAsset, ordertype, orderSide, price, quantity } = action.payload;
        const polkadexWorker = (window as any).polkadexWorker
        const _placeOrder = yield call(() => polkadexWorker.placeOrder(
            account,
            nonce,
            baseAsset,
            quoteAsset,
            ordertype,
            orderSide,
            price,
            quantity
        ));
        console.log({_placeOrder});
  
    } catch (error) {
        
    }
}