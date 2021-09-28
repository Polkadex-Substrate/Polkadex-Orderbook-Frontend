import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { useEffect, useState } from 'react';
export const useMnemonic = () => {
    const [mnemonic, setmnemonic] = useState<Array<string>>();
    const [loading, setLoading] = useState(true)
    const createMnemonic = async () => {
        await cryptoWaitReady()
        const mnemonicString = mnemonicGenerate();
        const mnemonicList = mnemonicString.split(' ');
        setmnemonic(mnemonicList)
        setLoading(false)
    }
    useEffect(() => {
        createMnemonic()
    }, [])
    return mnemonic
}