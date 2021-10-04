import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signAndSendExtrinsic } from "src/helpers/signAndSendExtrinsic";
import { InjectedAccount, polkadotWalletFetch, selectPolkadotWalletApi } from "src/modules/user/polkadotWallet"
import { useReduxSelector } from "."

export const useExtrinsics = (mainAccount: InjectedAccount) => {
    const api = useReduxSelector(selectPolkadotWalletApi);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(polkadotWalletFetch())
    }, [dispatch, api])

    const getInjectorFromExtension = async () => {
        const { web3FromSource } = await import('@polkadot/extension-dapp')
        const injector = await web3FromSource(mainAccount.meta.source);
        return injector
    }

    const sendOcexRegisterExtrinsic = async () => {
        const injector = await getInjectorFromExtension()
        const extrinsic = api.tx.polkadexOcex.register(mainAccount.address)
        signAndSendExtrinsic(extrinsic, injector, mainAccount.address);
    }
    const sendOcexAddProxyExtrinsic = async (proxyAddress:string) => {
        const injector = await getInjectorFromExtension()
        const extrinsic = api.tx.polkadexOcex.addProxy(mainAccount.address, proxyAddress)
        signAndSendExtrinsic(extrinsic, injector, mainAccount.address);

    }
    const sendOcexDepositExtrinsic = async (asset) => {
        const injector = await getInjectorFromExtension()
        const extrinsic = api.tx.polkadexOcex.deposit(mainAccount.address, { [asset]: null }, 500000);
        signAndSendExtrinsic(extrinsic, injector, mainAccount.address);
       
    }
    return {
        sendOcexRegisterExtrinsic,
        sendOcexAddProxyExtrinsic,
        sendOcexDepositExtrinsic
    }
}
