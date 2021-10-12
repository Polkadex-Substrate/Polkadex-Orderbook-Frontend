import { KeyringPair } from "@polkadot/keyring/types";
import { CANCEL_ORDERS_EXECUTE } from "./constants";

// actions
export interface CancelOrdersExecutionPayload {
    account: KeyringPair, 
    nonce: number, 
    baseAsset: string, 
    quoteAsset: string, 
    order_uuid: Uint8Array
}

export interface CancelOrdersExecutionAction {
    type: string,
    payload: CancelOrdersExecutionPayload
}


export const cancelOrdersExecute = (
    payload: CancelOrdersExecutionPayload
): CancelOrdersExecutionAction => ({
    type: CANCEL_ORDERS_EXECUTE,
    payload,
});