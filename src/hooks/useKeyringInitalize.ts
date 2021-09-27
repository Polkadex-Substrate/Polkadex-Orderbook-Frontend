import keyring from "@polkadot/ui-keyring";
import { useEffect, useState } from "react"

export const useKeyringInitalize = () => {
    const [loading, setLoading] = useState(true);
    const loadKeyring = async () => {
        const { cryptoWaitReady } = await import("@polkadot/util-crypto");
        await cryptoWaitReady();
        keyring.loadAll({ ss58Format: 2, type: 'ed25519' });
        console.log("keyring crypto initalized")
        setLoading(false)
    }
    useEffect(() => {
        loadKeyring()
    }, [])
    return loading
}