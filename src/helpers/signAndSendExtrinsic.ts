import { SubmittableExtrinsic } from "@polkadot/api/types"

export const signAndSendExtrinsic = (
    extrinsic: SubmittableExtrinsic<"promise", any>,
    injector: any,
    mainAddress: string) => {
    return new Promise((resolve, reject) => {
        extrinsic.signAndSend(mainAddress, { signer: injector.signer }, ({ status }) => {
            if (status.isInBlock) {
                console.log(`Completed at block hash #${status.asInBlock.toString()}`);
            } else {
                console.log(`Current status: ${status.type}`);
            }
        }).catch((error: any) => {
            console.log(':( transaction failed', error);
        });
    })
}