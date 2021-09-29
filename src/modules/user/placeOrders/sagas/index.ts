import { takeLatest } from 'redux-saga/effects';
import { PLACE_ORDERS_EXECUTE } from '../constants';
import { placeOrdersSaga } from './placeOrdersExecuteSaga';

export function* rootPlaceOrdersSaga() {
    yield takeLatest(PLACE_ORDERS_EXECUTE, placeOrdersSaga);
}
