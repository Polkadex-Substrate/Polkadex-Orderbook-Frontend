import keyring from "@polkadot/ui-keyring/index";
import { KeyringPair } from "@polkadot/keyring/types";
import { isUndefined } from "@polkadot/util";
import FileSaver from "file-saver";
const fileReader = new FileReader();

const createBlob = (fileBytes: Uint8Array): Blob =>
  new Blob([fileBytes], { type: "text/plain;charset=utf-8" });

export const downloadAccount = (pair: KeyringPair, password: string, address: string) => {
  const pairToJson = keyring.backupAccount(pair, password);
  const blob = new Blob([JSON.stringify(pairToJson)], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, `${address}.json`);
};

export const uploadAccount = (fileBytes: Uint8Array, password: string = null) => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadedFileKeyringPair = JSON.parse((event.target as any)?.result);
        const pair = keyring.restoreAccount(uploadedFileKeyringPair, password);
        return pair;
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  };

  fileReader.readAsText(blob);
};
