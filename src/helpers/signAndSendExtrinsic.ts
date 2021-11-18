import { SubmittableExtrinsic } from "@polkadot/api/types";

export interface ExtrinsicResponse {
  success: boolean;
  error?: any;
}

export const signAndSendExtrinsic = (
  extrinsic: SubmittableExtrinsic<"promise", any>,
  injector: any,
  mainAddress: string
) => {
  return new Promise<ExtrinsicResponse>((resolve, reject) => {
    extrinsic
      .signAndSend(mainAddress, { signer: injector.signer }, ({ events = [], status }) => {
        if (status.isFinalized) {
          events.forEach(({ event: { data, method, section }, phase }) => {
            console.log("", phase.toString(), `: ${section}.${method}`, data.toString());
          });
          console.log(`Transaction finalized at blockHash ${status.asFinalized}`);
          resolve({ success: true });
        } else {
          console.log(`Current status is ${status}`);
        }
      })
      .catch((error) => {
        resolve({ success: false, error });
      });
  });
};
