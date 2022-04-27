import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";

import { ExtrinsicResult, handleExtrinsicErrors } from "./signAndSendExtrinsic";

export const sendExtrinsicUnsigned = async (
  api: ApiPromise,
  extrinsic: SubmittableExtrinsic<"promise", any>
) => {
  return new Promise<ExtrinsicResult>((resolve, reject) => {
    extrinsic
      .send(({ status, events, dispatchError }) => {
        // status would still be set, but in the case of error we can shortcut
        // to just check it (so an error would indicate InBlock or Finalized)
        if (dispatchError) {
          if (dispatchError.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(dispatchError.asModule);
            const { docs, name, section } = decoded;

            const errMsg = `${section}.${name}: ${docs.join(" ")}`;
            reject(new Error(errMsg));
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            const errMsg = dispatchError.toString();
            reject(new Error(errMsg));
          }
        } else if (status.isInBlock) {
          handleExtrinsicErrors(events, api);
          const eventMessages = events.map(({ phase, event: { data, method, section } }) => {
            return `event:${phase} ${section} ${method}:: ${data}`;
          });
          resolve({ isSuccess: true, eventMessages, hash: extrinsic.hash.toHex() });
        }
      })
      .catch((e) => {
        reject(new Error(e));
      });
  });
};
