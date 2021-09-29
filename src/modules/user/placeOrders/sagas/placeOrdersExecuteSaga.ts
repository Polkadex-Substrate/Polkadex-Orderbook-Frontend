import { call, put } from 'redux-saga/effects';
import { PlaceOrdersExecutionAction } from '../actions';

export function* placeOrdersSaga(action: PlaceOrdersExecutionAction){
    try {
        const {account, nonce, baseAsset, quoteAsset, ordertype, orderSide, price, quantity } = action.payload;
        const polkadexWorker = (window as any).polkadexWorker
        /**
         *  const polkadexWorker = (window as any).polkadexWorker
            const { address, password } = action.payload
            const user = yield call(() => getKeyringPairFromAddress(address, password));
            const authResponse = yield call(() => polkadexWorker.authenticate(user));
            console.log({ authResponse })
            yield put(userData({ user }));
            process.browser && localStorage.setItem("csrfToken", user.csrf_token);
            yield put(signInData());
         */
  
    } catch (error) {
        
    }
}