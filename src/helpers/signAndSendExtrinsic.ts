/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Fix types
import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";

export interface ExtrinsicResult {
  isSuccess: boolean;
  message?: string;
  eventMessages?: string[];
  hash: string;
}

export const signAndSendExtrinsic = async (
  api: ApiPromise,
  extrinsic: SubmittableExtrinsic<"promise", any>,
  injector: any,
  address: string,
  waitForFinalization = false
) => {
  return new Promise<ExtrinsicResult>((resolve, reject) => {
    extrinsic
      .signAndSend(
        address,
        { signer: injector.signer },
        ({ status, events, dispatchError }) => {
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
          } else if (status.isInBlock && !waitForFinalization) {
            handleExtrinsicErrors(events, api);
            const eventMessages = events.map(({ phase, event: { data, method, section } }) => {
              return `event:${phase} ${section} ${method}:: ${data}`;
            });
            resolve({ isSuccess: true, eventMessages, hash: extrinsic.hash.toHex() });
          } else if (status.isFinalized && waitForFinalization) {
            handleExtrinsicErrors(events, api);
            const eventMessages = events.map(({ phase, event: { data, method, section } }) => {
              return `event:${phase} ${section} ${method}:: ${data}`;
            });
            resolve({ isSuccess: true, eventMessages, hash: extrinsic.hash.toHex() });
          }
        }
      )
      .catch((e) => {
        reject(new Error(e));
      });
  });
};
export const handleExtrinsicErrors = (events, api) => {
  events
    // find/filter for failed events
    .filter(({ event }) => api.events.system.ExtrinsicFailed.is(event))
    // we know that data for system.ExtrinsicFailed is
    // (DispatchError, DispatchInfo)
    .forEach(
      ({
        event: {
          data: [error],
        },
      }) => {
        if (error.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(error.asModule);
          const { docs, method, section } = decoded;
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          console.log("log: ", error.toString());
        }
      }
    );
};
