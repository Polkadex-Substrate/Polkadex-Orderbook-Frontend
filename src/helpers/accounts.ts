import keyring from "@polkadot/ui-keyring/index";
import { KeyringPair } from "@polkadot/keyring/types";
import { isUndefined } from "@polkadot/util";
import FileSaver from "file-saver";
const fileReader = new FileReader();

const createBlob = (fileBytes: Uint8Array): Blob =>
  new Blob([fileBytes], { type: "text/plain;charset=utf-8" });

const expectedJsonProperties: Array<string> = ["address", "encoding", "meta"];

export const downloadAccount = (pair: KeyringPair, password: string, address: string) => {
  try {
    const pairToJson = keyring.backupAccount(pair, password);
    const blob = new Blob([JSON.stringify(pairToJson)], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, `${address}.json`);
  } catch (error) {
    throw error;
  }
};

export const uploadAccount = (fileBytes: Uint8Array) => {
  if (!fileBytes || !fileBytes.length) {
    console.error("Error retrieving file list");
    return;
  }

  const blob: Blob = createBlob(fileBytes);

  fileReader.onload = (event) => {
    try {
      if (!isUndefined(event) && event.target !== null) {
        // Cast to type 'any' since property 'result' does exist on type 'EventTarget'
        // Reference: https://stackoverflow.com/a/45017155/3208553
        const uploadedFileKeyringPair = JSON.parse((event.target as any).result);
        const actualJsonProperties: Array<string> = Object.keys(uploadedFileKeyringPair);

        // if (arrayContainsArray(actualJsonProperties, expectedJsonProperties)) {
        //   keyring.loadAll();
        // } else {
        //   throw Error("Unable to load account with invalid JSON property names");
        // }
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  };

  fileReader.readAsText(blob);
};
