import { call, put } from "redux-saga/effects";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
import keyring from '@polkadot/ui-keyring';
import { sendError, signInKeyRingData, signUpError, SignUpKeyRingData } from "src/modules";

export function * signUpWithKeyRing(action: SignUpKeyRingData) {
    try {
        const { mnemonic, password, name } = action.payload
        const { pair, json } = keyring.addUri(mnemonic, 'myStr0ngP@ssworD', { name: 'mnemonic acc' });
        yield put(signInKeyRingData({ name, password }))
    }
    catch (error) {
        yield put(
            sendError({
                error,
                processingType: "alert",
                extraOptions: {
                    actionError: signUpError,
                },
            })
        );
    }
}
