import { KeyringPair } from "@polkadot/keyring/types";
import { PLACE_ORDERS_EXECUTE } from "./constants";

// actions
export interface PlaceOrdersExecutionPayload {
    account: KeyringPair,
    nonce: number,
    baseAsset: string,
    quoteAsset: string,
    ordertype: string,
    orderSide: string,
    price: number,
    quantity: number
}

export interface PlaceOrdersExecutionAction {
    type: string,
    payload: PlaceOrdersExecutionPayload
}


export const placeOrdersExecute = (
    payload: PlaceOrdersExecutionPayload
): PlaceOrdersExecutionAction => ({
    type: PLACE_ORDERS_EXECUTE,
    payload,
});